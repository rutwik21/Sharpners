
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/userServices');

exports.signupUser =async (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;


    try{
        const result = await UserServices.findOne(email);

        if (result === null){
            bcrypt.hash(password, 10, async(err,hash)=>{
                if(err){console.log(err)};
                await UserServices.create(name,email,phone,hash);
                res.json(1);
            });

            
        }else{
            res.json(0);
        }
        
    }catch(err){console.log(err)};
};