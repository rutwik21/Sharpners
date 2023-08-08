const groupConnection = require('../models/group');
const joinedgroup = require("../models/joinedgroup");

exports.create = async(groupName,createdBy,userId)=>{
    try{
        const result =  await groupConnection.create({groupName : groupName,createdBy:Number(userId)});
        await joinedgroup.create({userId:userId,groupId:result.id});
        return result;
    }catch(err){
        console.log('error >>>>',err);
    }
    
};


exports.findAll = async(userId)=>{
    try{
        const result =  await joinedgroup.findAll({where:{userId:userId},include: groupConnection});
        let arr =[];
        result.forEach(ele=>{
            if(Number(ele.group.dataValues.createdBy)===Number(userId)){
                arr.push({data:ele.group.dataValues,admin:true});
            }else{
                arr.push({data:ele.group.dataValues,admin:false});
            }

        })
        return arr;
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};


exports.findOne = async(groupId,userId)=>{
    try{
        const result = await groupConnection.findOne({where : {id:groupId}});
        await joinedgroup.create({userId:userId,groupId:result.id})
        return result;
    }catch(err){
        console.log('error >>>>',err);
    }
};