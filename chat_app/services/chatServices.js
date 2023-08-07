const chatConnection = require('../models/chat');

exports.findAll= async(groupId,userId,lastId)=>{
    try{
        if(lastId===0){
            return await chatConnection.findAll({where:{groupId:groupId}});
        }else{
            return await chatConnection.findAll({where:{groupId:groupId},limit:lastId-1});
        }
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};

exports.create = async(msg,name,userId,groupId)=>{
    try{
        return await chatConnection.create({massage : msg,name: name,userId : userId,groupId:groupId});
    }catch(err){
        console.log('error >>>>',err);
    }
    
};