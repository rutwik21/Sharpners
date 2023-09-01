
const usertable = require('../models/user');

exports.showLeaderboard = async (req,res,next)=>{

    try{
        const result =await usertable.find().select('name totalExpence').sort({'totalExpence': "descending"})

        res.json(result);
        
    }
    catch(err){console.log(err);res.status(401).json({error : err});};

};
