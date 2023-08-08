const sequelize = require("sequelize");

const sq = require("../util/connection");
const user = require("./users");


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
      type:sequelize.INTEGER,
      references: {
            model: user,
            key: 'id'
          },
      allowNull:false
    }
  });
  
  module.exports = group;