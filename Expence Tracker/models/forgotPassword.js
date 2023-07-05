
const sequelize = require("sequelize");

const sq = require("../util/connection");


const forgotPassword = sq.define('forgotPassword', {
    
    id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: sequelize.BOOLEAN,
    expiresby: sequelize.DATE
  });
  
  module.exports = forgotPassword;


