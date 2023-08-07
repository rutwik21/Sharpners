const sequelize = require("sequelize");

const sq = require("../util/connection");
const group= require("./group");
const user = require("./users");


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
    // userId:{
    //   type: sequelize.INTEGER,
    //   references:{
    //     model:user,
    //     key:'id'
    //   }
    // },
    // groupId:{
    //   type: sequelize.INTEGER,
    //   references:{
    //     model:group,
    //     key:'id'
    //   }
    // }
  });
  
  module.exports = Chats;