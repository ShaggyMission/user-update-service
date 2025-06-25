const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/users', swaggerRoutes);

module.exports = app;
