const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = asyncHandler(async (req, res) => {
  const { user_name, password } = req.body;

  console.log(`Logging in user: ${user_name}`);

  const user = await User.findOne({ user_name });

  if (user) {
    console.log(`User found: ${user}`);

    const passwordMatch = await user.matchPassword(password);

    if (passwordMatch) {
      console.log('Password matches. Generating token.');

      res.json({
        token: generateToken(user._id, user.role),
        user: {
          id: user._id,
          user_name: user.user_name,
          name: user.name,
          email: user.email,
          mobile_number: user.mobile_number,
          status: user.status,
          role: user.role,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
        role: user.role,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = {
  authUser,
};
