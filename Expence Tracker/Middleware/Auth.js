const jwt = require('jsonwebtoken');
const userConnection = require('../models/user');

exports.auth = (req,res,next) =>  {
    try{
    const token = req.header('Auth');
    const userId = jwt.verify(token,'secretkey');
    userConnection.findByPk(userId).then(user =>{
        req.user = user;
        next();
    })}
    catch(err){console.log(err)}
};