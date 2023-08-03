const userConnection = require('../models/users');

exports.findOne = async (email)=>{
return await userConnection.findOne({ where: { email: email } });
};

exports.create = async(name,email,phone,hash)=>{
return await userConnection.create({name : name,email : email,phone : phone,password : hash});
};