
const { RESERVED } = require('mysql2/lib/constants/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userConnection = require('../models/user');

exports.signupUser =async (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    try{
        const result = await userConnection.findOne({ where: { email: email } });

        if (result === null){
            bcrypt.hash(password, 10, async(err,hash)=>{
                if(err){console.log(err)};
                await userConnection.create({name : name,email : email,password : hash, isPremiumUser : false, totalExpence : 0 });
                res.json(1);
            });

            
        }else{
            res.json(0);
        }
        
    }catch(err){console.log(err)};
};

exports.loginUser =async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const result = await userConnection.findOne({ where: { email: email } });

        if (result === null){
            res.status(404).json({user : false});
        };
        
        bcrypt.compare(password, result.password, (err,r) =>{
            if(r){
                const userId = jwt.sign(result.id,'secretkey'); 
                res.json({userId: userId, isPremiumUser: result.isPremiumUser});
            }
            else{res.status(401).json({pass : false});}
        });
            
        
    }catch(err){console.log(err)};
    
};





