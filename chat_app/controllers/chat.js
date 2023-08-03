
const jwt = require('jsonwebtoken');
const chatServices = require('../services/chatServices');
const userServices = require('../services/userServices');

exports.newChat = async(req,res,next)=>{
    const userId=jwt.decode(req.body.userId,'secretkey');
    chatServices.create(req.body.massage,req.body.name,userId);
    res.status(200).json({success:true});
}

exports.getChat = async(req,res,next)=>{
    const userId=jwt.decode(req.body.userId,'secretkey');
    const result = await chatServices.findAll();
    res.status(200).json({data: result, success:true});
}