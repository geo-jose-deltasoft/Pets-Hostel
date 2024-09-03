import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '..';

interface RoleAttributes {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'roles',
    sequelize: sequelizeConnection,
  }
);

export default Role;
