const express = require('express');
const sequelize = require('./config/database');
const { registerUser } = require('./controllers/userController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/register', registerUser);

const PORT = 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`User Registration Service running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
