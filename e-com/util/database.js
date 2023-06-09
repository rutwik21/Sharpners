const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'rutwik', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
