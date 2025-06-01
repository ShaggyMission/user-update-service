const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/user', swaggerRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`User Registration Service running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
