const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenceSchema= new Schema({
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
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref : 'user',
    required: true
  },
  createdAt:{
    type: Date, 
    default: Date.now
  }

})


module.exports=mongoose.model('expence',expenceSchema);


// const sequelize = require("sequelize");

// const sq = require("../util/connection");


// const Expence = sq.define('expence', {
//     id: {
//       type: sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     amount: {
//         type :sequelize.INTEGER,
//         allowNull: false
//     },
//     description: {
//       type: sequelize.TEXT,
//       allowNull: false
//     },
//     category: {
//         type: sequelize.STRING
//       },
//     type:{
//       type:sequelize.STRING,
//       allowNull:false
//     }
//   });
  
//   module.exports = Expence;