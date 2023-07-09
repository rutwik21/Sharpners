const userConnection = require('../models/user');

exports.findOne = async (email)=>{
return await userConnection.findOne({ where: { email: email } });
};

exports.create = async(name,email,hash)=>{
return await userConnection.create({name : name,email : email,password : hash, isPremiumUser : false, totalExpence : 0 });
};