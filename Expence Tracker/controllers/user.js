
const { RESERVED } = require('mysql2/lib/constants/client');
const userConnection = require('../models/user');

exports.signupUser =async (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const result = await userConnection.findOne({ where: { email: email } });
        if (result === null){
            await userConnection.create({name : name,email : email,password : password });
            res.json(1);
        }else{
            res.json(0);
        }
        
    }catch(err){console.log(err);res.send(err);};
};

exports.loginUser =async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const result = await userConnection.findOne({ where: { email: email, password:password } });
        if (result === null){
            res.json(0);
        }else{
            res.json(result);
        }
        
    }catch(err){console.log(err);res.send(err);};
};



