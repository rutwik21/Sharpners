const sequelize = require("sequelize");

const sq = require("../util/connection");
const user = require("./users");
const group = require("./group");


const joinedgroup = sq.define('joinedgroups', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // userId: {
    //   type: sequelize.INTEGER,
    //   references: {
    //     model: user,
    //     key: 'id'
    //   }
    // },
    // groupId: {
    //   type:sequelize.INTEGER,
    //   references: {
    //     model: group, 
    //     key: 'id'
    //   }
    // }
  });
  
  module.exports = joinedgroup;


