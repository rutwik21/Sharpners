
const jwt = require('jsonwebtoken');
const chatServices = require('../services/chatServices');
const userServices = require('../services/userServices');

exports.newChat = async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.body.userId,'secretkey');
        chatServices.create(req.body.massage,req.body.name,userId);
        res.status(200).json({success:true});
    }catch(err){console.log(err)}
    
}

exports.getChat = async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.body.userId,'secretkey');
        let result;
        if(req.query.chatId>0){
            result = await chatServices.findAll(req.query.chatId);
        }else{
            result = await chatServices.findAll();
        }

        res.status(200).json({data: result, success:true});
    }catch(err){console.log(err)}
    
}