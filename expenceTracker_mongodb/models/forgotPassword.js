
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordSchema= new Schema({
  amount: {
    type : Number,
    required: true
  },
  description: {
    type : String,
    required: true
  },
  category: {
    type : String,
    required: true
    },
  type:{
    type : String,
    required: true
  }

})


module.exports=mongoose.model('forgotPassword',forgotPasswordSchema);




// const sequelize = require("sequelize");

// const sq = require("../util/connection");


// const forgotPassword = sq.define('forgotPassword', {
    
//     id: {
//         type: sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: sequelize.BOOLEAN,
//     expiresby: sequelize.DATE
//   });
  
//   module.exports = forgotPassword;


