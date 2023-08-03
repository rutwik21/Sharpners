const sequelize = require("sequelize");

const sq = require("../util/connection");


const Chats = sq.define('chats', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    massage: {
        type :sequelize.STRING,
        allowNull: false
    },
    name: {
      type:sequelize.STRING,
      allowNull:false
    }
  });
  
  module.exports = Chats;