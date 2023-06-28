const expenceTable = require('../models/expence');
const jwt = require('jsonwebtoken');

exports.addExpence = async(req,res,next)=>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = jwt.verify(req.body.token,'secretkey');
    try{
        await expenceTable.create({amount : amount,description : description,category : category, userId : userId});
        res.end()
    }catch(err){console.log(err);res.status(401)};
};

exports.getExpence = async(req,res,next)=>{
    const data = await expenceTable.findAll({where : {userId : req.user.id}});
    res.json(data);
};

exports.deleteExpence = async(req,res,next)=>{
    try{
        const id = req.params.id;
        let ex = await expenceTable.findByPk(id);
        ex.destroy();
        res.end();
    }catch(err){console.log(err)};
};