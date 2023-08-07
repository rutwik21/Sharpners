const groupConnection = require('../models/group');
const joinedgroup = require("../models/joinedgroup");

exports.create = async(groupName,createdBy,userId)=>{
    try{
        const result =  await groupConnection.create({groupName : groupName,createdBy: createdBy});
        await joinedgroup.create({userId:userId,groupId:result.id});
        return result;
    }catch(err){
        console.log('error >>>>',err);
    }
    
};


exports.findAll = async(userId)=>{
    try{
        return await joinedgroup.findAll({where:{userId:userId},include: groupConnection});
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};


exports.findOne = async(groupId,userId)=>{
    try{

        const result = await groupConnection.findOne({where : {id:groupId}});
        await joinedgroup.create({userId:userId,groupId:result.id})
    }catch(err){
        console.log('error >>>>',err);
    }
};