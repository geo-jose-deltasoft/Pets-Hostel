import { Request, Response, NextFunction } from 'express';
import { decodeJwtToken } from '../util/common';
import { RoleDto } from '../dtos/user.dto';

class Middleware {
  verify(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['authorization']?.replace('Bearer ', '');
    const { role }: any = decodeJwtToken(token);
    if (RoleDto.ADMIN === role) {
      return next();
    }
    return res.status(401).json({ message: 'Permission denied!' });
  }
}
export default new Middleware();
