const jwt = require('jsonwebtoken');
const groupServices = require('../services/groupServices');

exports.createGroup = async (req,res,next)=>{
    try{
        const userId=jwt.decode(req.body.userId,'secretkey');
        const result = await groupServices.create(req.body.groupName, req.body.createdBy, userId);
        res.status(200).json({result:result,success:true}); 

    }catch(err){console.log(err)}
    
};

exports.getGroup = async (req,res,next)=>{
    try{
        const userId=jwt.decode(req.query.userId,'secretkey');
        
        const result = await groupServices.findAll(userId);
        res.status(200).json({data: result, success:true});

    }catch(err){console.log(err)}
}

exports.getGroupById = async (req,res,next)=>{
    try{
        const userId=jwt.decode(req.query.userId,'secretkey');
        const result = await groupServices.findOne(req.query.groupId,userId);
        res.status(200).json({data: result, success:true});

    }catch(err){console.log(err)}
}

