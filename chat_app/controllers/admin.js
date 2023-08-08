const adminServices = require('../services/adminServices');
const jwt = require('jsonwebtoken');

exports.getGroupMembers = async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.query.userId,'secretkey');
        const result = await adminServices.findAll(req.query.groupId,userId);
        if(result){
            res.status(200).json({data: result, success:true});
        }
        
    }catch(err){console.log(err)}
    
}

exports.makeAdmin = async(req,res,next)=>{
    try{
        const result = await adminServices.makeAdmin(req.body.groupId,req.body.userId);
        
        if(result){
            res.status(200).json({data: result, success:true});
        }
        
    }catch(err){console.log(err)}
    
}

exports.removeMember = async(req,res,next)=>{
    try{
        const result = await adminServices.removeMember(req.body.groupId,req.body.userId);
        console.log(result);
        if(result){
            res.status(200).json({data: result, success:true});
        }
        
    }catch(err){console.log(err)}
    
}

exports.searchMember = async(req,res,next)=>{
    try{
        const result = await adminServices.searchMember(req.body.phone,req.body.groupId);
        
        if(result){
            res.status(200).json({data: result, success:true});
        }else{
            res.status(200).json({data: result, success:false});
        }
        
    }catch(err){console.log(err)}
    
}


exports.addMember = async(req,res,next)=>{
    try{
        const result = await adminServices.addMember(req.body.userId,req.body.groupId);
        console.log(result);
        if(result){
            res.status(200).json({data: result, success:true});
        }else{
            res.status(200).json({data: result, success:false});
        }
        
    }catch(err){console.log(err)}
    
}