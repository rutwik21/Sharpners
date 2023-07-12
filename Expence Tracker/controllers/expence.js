const expenceTable = require('../models/expence');
const usertable = require('../models/user');
const sq = require('../util/connection');
const S3services =require('../services/S3services');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const converter = require('json-2-csv');
const { resourceLimits } = require('worker_threads');
const { Console } = require('console');


exports.addExpence = async(req,res,next)=>{
    const t = await sq.transaction(); 
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const type = req.body.type;
    const userId = jwt.verify(req.body.token,'secretkey');

    try{
        await expenceTable.create({amount : amount,description : description,category : category,type: type, userId : userId},{transaction: t});
        const user = await usertable.findByPk(userId);
        const updatetotal = user.totalExpence +Number(amount);
        user.totalExpence = updatetotal;
        await user.save({transaction:t});
        await t.commit();
        res.end();
    }catch(err){
        await t.rollback();
        console.log(err);
        res.status(401)};
};

exports.getExpence = async(req,res,next)=>{
    try{
        const page = req.query.page;
        const limit = Number(req.query.limit);

        const offset = (page-1)*limit;
        const data = await expenceTable.findAll({where : {userId : req.user.id},offset: offset,limit:limit});
        const totalCount = await expenceTable.count({where:{userId : req.user.id}});
        const hasPrevious = page>1;
        const hasNext=limit*page < totalCount;

        res.json({data:data,hasNext:hasNext,hasPrevious:hasPrevious});
    }catch(err){console.log(err)}
    
};

exports.deleteExpence = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const ex = await expenceTable.findByPk(id);
        const t = await sq.transaction(); 

        const userId = ex.userId;
        const user = await usertable.findByPk(userId);
        const updatetotal = user.totalExpence - Number(ex.amount);
        user.totalExpence = updatetotal;
        await user.save({transaction:t});

        await ex.destroy();
        await t.commit();
        res.end();
    }catch(err){
        await t.rollback();
        console.log(err);
        res.json({error : err});
    };
};

exports.download = async(req,res,next)=>{
    try{
        const data = await expenceTable.findAll({where : {userId : req.user.id}});
        const a= [];
        data.forEach(element => {
            a.push(element.dataValues);
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

