import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '..';
import { UserStatus } from '../../dtos/user.dto';



interface UserAttributes {
  id: string;
  user_name: string;
  name: string;
  email: string;
  password: string;
  mobile_number: string;
  status: UserStatus;
  role_id: string; 
  created_at?: Date;
  updated_at?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public user_name!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile_number!: string;
  public status!: UserStatus;
  public role_id!: string; 
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
  },
  {
    tableName: 'users',
    sequelize: sequelizeConnection,
  }
);

export default User;
