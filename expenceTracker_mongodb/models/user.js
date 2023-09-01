
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema= new Schema({
  name: {
    type : String,
    required: true
  },
  email: {
    type : String,
    required: true
  },
  password: {
    type : String,
    required: true
    },
  isPremiumUser:{
    type : Boolean
  },
  totalExpence:{
    type : Number,
    required: true
  }

});


module.exports=mongoose.model('user',userSchema);





// const sequelize = require("sequelize");

// const sq = require("../util/connection");


// const User = sq.define('user', {
//     id: {
//       type: sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//         type :sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//       type: sequelize.STRING,
//       allowNull: false,
//       unique: true
//     },
//     password: {
//       type: sequelize.STRING,
//       allowNull: false
//     },
//     isPremiumUser: sequelize.BOOLEAN,
//     totalExpence: {
//       type :sequelize.INTEGER,
//       allowNull: false
//     }

//   });
  
//   module.exports = User;

