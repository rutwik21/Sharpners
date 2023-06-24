const sequelize = require('sequelize');

const sq = new sequelize('expence', 'root', 'rutwik', {
    dialect: 'mysql',
    host: 'localhost'
  });

module.exports = sq;