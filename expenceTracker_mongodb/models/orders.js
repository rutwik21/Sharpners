
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema= new Schema({
    paymentId : String,
    orderId: String,
    status:String,
    userId:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require: true
    }

});


module.exports=mongoose.model('order',orderSchema);

// const sequelize = require("sequelize");

// const sq = require("../util/connection");


// const Orders = sq.define('orders', {
//     id: {
//       type: sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     paymentId : sequelize.STRING,
//     orderId: sequelize.STRING,
//     status:sequelize.STRING
//   });
  
//   module.exports = Orders;