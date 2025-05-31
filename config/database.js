const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_service_db', 'root', 'Lis.12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
