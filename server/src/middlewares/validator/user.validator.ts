import { body, param,query } from 'express-validator';

class UserValidator{
  checkCreateUser() {
    return [
      body('first_name')
        .bail()
        .optional(),
      body('last_name').optional().bail()
    ];
  }
}

export default new UserValidator();
