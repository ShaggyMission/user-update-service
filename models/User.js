const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { nanoid } = require('nanoid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING, 
    defaultValue: () => nanoid(12),
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
