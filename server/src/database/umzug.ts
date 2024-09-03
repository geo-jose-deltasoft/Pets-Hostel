import { Umzug, SequelizeStorage } from 'umzug';
import sequelizeConnection from './index';

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }]
  },
  context: sequelizeConnection,
  storage: new SequelizeStorage({
    sequelize: sequelizeConnection
  }),
  logger: console
});

export const seedor = new Umzug({
  migrations: {
    glob: ['seeders/*.ts', { cwd: __dirname }]
  },
  context: sequelizeConnection,
  storage: new SequelizeStorage({
    sequelize: sequelizeConnection,
    modelName: 'SequelizeData'
  }),
  logger: console
});

export type Migration = typeof migrator._types.migration;
export type Seeder = typeof seedor._types.migration;
