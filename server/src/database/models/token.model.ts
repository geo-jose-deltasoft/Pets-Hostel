import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '..';
import User from './user.model';

interface TokenAttributes {
  id: string;
  token: string;
  user_id: string;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
  public id!: string;
  public token!: string;
  public user_id!: string;
  public expires_at!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'tokens',
    sequelize: sequelizeConnection,
  }
);

Token.belongsTo(User, { foreignKey: 'user_id' });

export default Token;
