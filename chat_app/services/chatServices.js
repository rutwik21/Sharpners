const chatConnection = require('../models/chat');

exports.findAll= async(lastId)=>{
    try{
        if(lastId===0){
            return await chatConnection.findAll();
        }else{
            return await chatConnection.findAll({limit:lastId-1});
        }
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};

exports.create = async(msg,name,userId)=>{
    try{
        return await chatConnection.create({massage : msg,name: name,userId : userId});
    }catch(err){
        console.log('error >>>>',err);
    }
    
};