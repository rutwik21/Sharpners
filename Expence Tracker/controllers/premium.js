const expenceTable = require('../models/expence');
const sequelize = require('sequelize');
const usertable = require('../models/user');

exports.showLeaderboard = async (req,res,next)=>{

    try{
        const result =await expenceTable.findAll({
            attributes:[[sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],'userId'],
         group:"userId",
         include : [{ model : usertable}] 
        });

        res.json(result);
        
    }
    catch(err){console.log(err);res.status(401).json({error : err});};

};
