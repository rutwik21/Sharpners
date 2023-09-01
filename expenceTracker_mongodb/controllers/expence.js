const mongoose = require('mongoose');
const ObjectId =  mongoose.Types.ObjectId;

const expenceTable = require('../models/expence');
const usertable = require('../models/user');
const S3services =require('../services/S3services');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const converter = require('json-2-csv');
const { resourceLimits } = require('worker_threads');
const { Console } = require('console');


exports.addExpence = async(req,res,next)=>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const type = req.body.type;
    const userId =new ObjectId(jwt.verify(req.body.token,'secretkey')) ;

    try{
        await expenceTable.create({amount : amount,description : description,category : category,type: type, userId : userId});
        
        const user =await usertable.findOne({_id:userId});
        user.totalExpence= user.totalExpence + Number(amount);
        await user.save();
        res.end();
        
    }catch(err){
        console.log(err);
        res.status(401)};
};

exports.getExpence = async(req,res,next)=>{
    try{
        const page = req.query.page;
        const userId = new ObjectId(req.user.id)
        const limit = Number(req.query.limit);
        
        const offset = (page-1)*limit;
        const data = await expenceTable.find({userId: userId}).skip(offset).limit(limit);
        
        const totalCount = await expenceTable.count({userId : userId});
        const hasPrevious = page>1;
        const hasNext=limit*page < totalCount;

        res.json({data:data,hasNext:hasNext,hasPrevious:hasPrevious});
    }catch(err){console.log(err)}
    
};

exports.deleteExpence = async(req,res,next)=>{
    try{
        const _id = req.params._id;
        const ex = await expenceTable.findById(_id);

        const userId = ex.userId;
        const user = await usertable.findById(userId);
        const updatetotal = user.totalExpence - Number(ex.amount);
        user.totalExpence = updatetotal;
        await user.save();

        await expenceTable.deleteOne({_id: _id});
        res.end();
    }catch(err){
        console.log(err);
        res.json({error : err});
    };
};

exports.download = async(req,res,next)=>{
    try{
        const data = await expenceTable.find({userId :new ObjectId(req.user.id)});
        const a= [];
        data.forEach(element => {
            a.push({createdAt:element.createdAt,amount:element.amount,description:element.description,category:element.category,type:element.type});
        });
        const b=await converter.json2csv(a,(err,csv)=>{
            if(err){console.log(err)}
            return csv;
        });
        const fileUrl = await S3services.uploadToS3(b,'data.csv');
        res.status(201).json({fileUrl : fileUrl})
        
    }
    catch(err){
        console.log(err);
    }
}

