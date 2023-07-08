const sequelize = require("sequelize");

const sq = require("../util/connection");


const Expence = sq.define('expence', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    amount: {
        type :sequelize.INTEGER,
        allowNull: false
    },
    description: {
      type: sequelize.TEXT,
      allowNull: false
    },
    category: {
        type: sequelize.STRING
      },
    type:{
      type:sequelize.STRING,
      allowNull:false
    }
  });
  
  module.exports = Expence;