const sequelize = require("sequelize");

const sq = require("../util/connection");


const User = sq.define('users', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type :sequelize.STRING,
        allowNull: false
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type:sequelize.NUMBER,
      allowNull: false,
      unique:true
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    }
  });
  
  module.exports = User;