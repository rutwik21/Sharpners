const sequelize = require('sequelize');
require('dotenv').config();

const sq = new sequelize('chatapp','root','rutwik', {
    dialect: 'mysql',
    host: 'localhost'
  });

module.exports = sq;
// process.env.DB_NAME,process.env.DB_USERNAME , process.env.DB_PASSWORDprocess.env.DB_HOST