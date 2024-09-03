import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';
import { notFoundHandler } from './middlewares/not-found';
import router from './routes';
import logger from './logger/api.logger';
import { expressjwt } from 'express-jwt';


export const createServer = () => {
  dotenv.config();
  const port = process.env.SERVER_PORT || 3000;

  const app: Application = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());

 
  const secret: string = process.env.JWT_SECRET || '';
  if (secret === '') {
    logger.error('JWT_SECRET environment variable is missing');
    process.exit(1);
  }

  app.use(
    expressjwt({
      secret,
      algorithms: ['HS256'],
    }).unless({
      path: [
        { url: '/api/v1/auth/register', methods: ['POST'] },
        { url: '/api/v1/auth/login', methods: ['POST'] },
        { url: '/api/v1/booking', methods: ['POST'] },

      ],
    })
  );

  app.use(function (err: any, req: Request, res: Response, next: any) {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: err.message });
      return;
    }
    next();
  });

  app.use('/api/v1/', router);

  app.use(notFoundHandler);

  interface Error {
    message?: string;
    status?: number;
  }

  app.use((err: Error, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('errors');
  });

  app.listen(port, () => {
    logger.info(`Server started at ${port}`);
  });
};

try {
  sequelize.authenticate();
  createServer();
} catch (error) {
  logger.info('Error creating connection');
  logger.info(error);
}
