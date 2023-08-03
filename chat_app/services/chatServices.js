const chatConnection = require('../models/chat');

exports.findAll= async()=>{
    try{
        return await chatConnection.findAll();
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