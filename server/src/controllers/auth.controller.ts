import { NextFunction, Request, Response } from 'express';
import logger from '../logger/api.logger';
import { AuthService } from '../services';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).json(user);
    } catch (e : any) {
      logger.error(e);
      if (e.message === 'EmailAlreadyExists') {
        return res.status(400).json({ msg: 'Email already exists' });
      }

      if (e.message === 'PhoneNumberAlreadyExists') {
        return res.status(400).json({ msg: 'Phone number already exists' });
      }

      if (e.message === 'RoleNotFound') {
        return res.status(400).json({ msg: 'Role not found' });
      }

      return res.status(500).json({ msg: 'Failed to register user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
        const { user_name, email, password } = req.body;
        let usernameOrEmail;
        if (user_name) {
            usernameOrEmail = user_name;
        } else if (email) {
            usernameOrEmail = email;
        } else {
            return res.status(400).json({ msg: 'Username or email is required' });
        }
        const userData = await AuthService.login(usernameOrEmail, password); // Use either user_name or email
        if (userData) {
            return res.status(200).json({ token: userData.token, user: userData.user, role: userData.role});
        }
        return res.status(401).json({ msg: 'Invalid credentials' });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({ msg: 'Login failed' });
    }
}   
}

export default new AuthController();
