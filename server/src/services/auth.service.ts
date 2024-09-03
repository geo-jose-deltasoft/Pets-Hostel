import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import User from '../database/models/user.model';
import Token from '../database/models/token.model';
import { RoleDto, UserDto, UserStatus } from '../dtos/user.dto';
import Role from '../database/models/role.model';

import { Op } from 'sequelize';
import { generateJwtToken } from '../util/common';

const { JWT_SECRET } = process.env;

export default class AuthService {
    static async register(user: UserDto) {
    
        // Check if user with the same email exists
        const existingEmailUser = await User.findOne({ where: { email : user.email } });
        if (existingEmailUser) {
          throw new Error('EmailAlreadyExists');
        }
    
        // Check if user with the same phone number exists
        const existingPhoneUser = await User.findOne({ where: { mobile_number: user.mobile_number } });
        if (existingPhoneUser) {
          throw new Error('PhoneNumberAlreadyExists');
        }
    
        // Check if the role exists
        const roleRecord = await Role.findOne({ where: { name: user.role } });
        if (!roleRecord) {
          throw new Error('RoleNotFound');
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
    
        // Create the new user
        const id = uuid();
        const roleId = roleRecord.id;
        const userObject = {
          id,
          user_name: user.user_name,
          name: user.name,
          email: user.email,
          password: hashedPassword,
          mobile_number: user.mobile_number,
          status: UserStatus.ACTIVE,
          role_id: roleId,
        };
    
        const userData = await User.create(userObject);
        return userData;
      }


  static async login(usernameOrEmail: string, password: string) {

    const user = await User.findOne({
        where: {
            [Op.or]: [{ user_name: usernameOrEmail }, { email: usernameOrEmail }]
        }
    });


    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }

    // Fetch the role from the database based on the user's role
    const roleInstance = await Role.findByPk(user.role_id);
    if (!roleInstance) {
      throw new Error('Role not found');
    }
    
    // Map the role model instance to its corresponding enum value
    let roleValue: RoleDto;
    switch (roleInstance.name) {
      case 'ADMIN':
        roleValue = RoleDto.ADMIN;
        break;
      case 'USER':
        roleValue = RoleDto.USER;
        break;
      case 'STAFF':
        roleValue = RoleDto.USER;
        break;
      default:
        throw new Error('Invalid role');
    }

    const token = generateJwtToken(user.id, roleValue)

    await Token.create({
        id: uuid(),
        token,
        user_id: user.id,
        expires_at: new Date(Date.now() + 60 * 60 * 1000)
    });

    return {user, token, role: roleValue}
    }
}

