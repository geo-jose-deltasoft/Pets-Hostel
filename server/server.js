const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const response = await axios.post('https://api.orianacare.com/api/v1/auth/login', {
      user_name,
      password
    });

    // If login successful, return token and user details
    if (response.status === 200) {
      const { token, user, role } = response.data;
      res.json({ token, user, role });
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
