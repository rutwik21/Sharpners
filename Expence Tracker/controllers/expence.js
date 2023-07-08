const expenceTable = require('../models/expence');
const usertable = require('../models/user');
const sq = require('../util/connection');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const converter = require('json-2-csv');

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
    const data = await expenceTable.findAll({where : {userId : req.user.id}});
    res.json(data);
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

        fs.writeFileSync("./files/data.csv",b);
        res.status(201).json({fileUrl : "../files/data.csv"})
        
    }
    catch(err){
        console.log(err);
    }
}
