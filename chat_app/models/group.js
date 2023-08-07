const sequelize = require("sequelize");

const sq = require("../util/connection");


const group = sq.define('group', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    groupName: {
      type:sequelize.STRING,
      allowNull:false
    },
    createdBy:{
      type:sequelize.STRING,
      allowNull:false
    }
  });
  
  module.exports = group;