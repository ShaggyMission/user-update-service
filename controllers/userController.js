const bcrypt = require('bcrypt');
const axios = require('axios');
const User = require('../models/userModels');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

  await axios.post('http://localhost:3001/roles/assign-role', {
    userId: newUser.id,
    roleName: 'Contributor'
  });


  res.status(201).json({ message: 'User registered successfully', userId: newUser.id, });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { registerUser };
