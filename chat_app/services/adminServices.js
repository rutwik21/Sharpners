const joingrpConnection = require('../models/joinedgroup');
const group = require('../models/group');
const userConnection = require('../models/users');
const joinedgroup = require('../models/joinedgroup');

exports.findAll= async(groupId,userId)=>{
    try{
        const result = await joingrpConnection.findAll({where:{groupId:groupId},include:userConnection});
        let arr = [];
        result.forEach(element => {
            if(Number(userId)===element.dataValues.user.dataValues.id){
                element.dataValues.user.dataValues.admin=true;
            }else{
                element.dataValues.user.dataValues.admin=false;
            }
            arr.push(element.dataValues.user.dataValues);
        });
        
        return arr;
    }catch(err){
        console.log('error >>>>',err);
    }
    
};

exports.makeAdmin = async(groupId,userId)=>{
    try{
        const result = await group.findByPk(groupId);
        result.createdBy =Number(userId);
        return await result.save();
    }catch(err){
        console.log('error >>>>',err);
    }
    
};

exports.removeMember = async(groupId,userId)=>{
    try{
        return await joingrpConnection.destroy({where:{groupId:groupId, userId:userId}});
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};

exports.searchMember = async(phone,groupId)=>{
    try{
        const user = await userConnection.findOne({where:{phone:phone}});
        if(user){
            const userId = user.dataValues.id;
            const result = await joinedgroup.findOne({where:{userId:userId, groupId:groupId}});
            if(result){
                return false;
            }else{
                return user.dataValues;
            }
        }else{
            return false;
        }
        
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};



exports.addMember = async(userId,groupId)=>{
    try{
        return await joingrpConnection.create({userId:userId,groupId:groupId});
        
    }catch(err){
        console.log('error >>>>',err);
    }
    
};