
const jwt = require('jsonwebtoken');
const chatServices = require('../services/chatServices');

exports.newChat = async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.body.userId,'secretkey');
        chatServices.create(req.body.massage,req.body.name,userId,req.body.groupId);
        res.status(200).json({success:true});
    }catch(err){console.log(err)}
    
}

exports.getChat = async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.query.userId,'secretkey');
        const groupId=req.query.groupId;
        console.log('chat id >>>>>',req.query.chatId);
        let result;
        if(Number(req.query.chatId)>0){
            result = await chatServices.findAll(groupId,userId,req.query.chatId);
        }else{
            result = await chatServices.findAll(groupId,userId,0);
        }
        res.status(200).json({data: result, success:true});
    }catch(err){console.log(err)}
    
}