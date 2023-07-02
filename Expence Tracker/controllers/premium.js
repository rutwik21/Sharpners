const expenceTable = require('../models/expence');
const sequelize = require('sequelize');
const usertable = require('../models/user');

exports.showLeaderboard = async (req,res,next)=>{

    try{
        const result =await usertable.findAll({
            attributes:['name',[sequelize.fn('sum', sequelize.col('expences.amount')), 'total_amount']],
            include : [{ model : expenceTable, attributes:[]}], 
            group:"user.id",
            order : [['total_amount', 'DESC']]
        });

        res.json(result);
        
    }
    catch(err){console.log(err);res.status(401).json({error : err});};

};
