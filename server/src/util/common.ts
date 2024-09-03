
import jwt from 'jsonwebtoken';
import logger from '../logger/api.logger';
import { RoleDto } from '../dtos/user.dto';
/**
 * @param user is userId
 * @param role is ROLES.ADMIN / ROLES.USER
 * @returns
 */
export function generateJwtToken(user: string, role: RoleDto) {
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        user,
        role
      },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '14d'
      }
    );
    return token;
  }
  
  export function decodeJwtToken(token: string) {
    try {
      const secret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, secret);
      const { user, role } = decoded;
      logger.info(`user are ${user} ${role}`)
      return { user, role };
    } catch (error) {
      logger.error('JWT verification failed:', error);
      return null;
    }
  }