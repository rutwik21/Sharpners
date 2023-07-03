
const usertable = require('../models/user');

exports.showLeaderboard = async (req,res,next)=>{

    try{
        const result =await usertable.findAll({
            attributes:['name','totalExpence'],
            order : [['totalExpence', 'DESC']]
        });

        res.json(result);
        
    }
    catch(err){console.log(err);res.status(401).json({error : err});};

};
