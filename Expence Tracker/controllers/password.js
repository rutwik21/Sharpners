const usertable = require('../models/user');
const forgotPasswordTable = require('../models/forgotPassword');
const Sib = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
require('dotenv').config();



exports.forgotPassword = async (req,res,next)=>{

    try{
        
        const email = req.body.email;

        const result =await usertable.findOne({
            where:{email : email}
        });

        if(result){
            const id = uuid.v4();
            const userId = result.id;
            forgotPasswordTable.create({ id:id, active: true })
                .catch(err => {
                    throw new Error(err)
                })

            const client = Sib.ApiClient.instance;

            const apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.API_KEY_EMAIL
            const tranEmailApi = new Sib.TransactionalEmailsApi();

            const sender = {email:'rutwikkashid000@gmail.com'}
            const receiver = [{
                email : email
            }]

            tranEmailApi.sendTransacEmail({
                sender: sender,
                to:receiver,
                subject:'Reset Password',
                htmlContent:`
                <body>
                <a href="http://localhost:3000/password/resetPassword/{{params.id}}?userId={{params.userId}}">Reset your password</a>
                </body>
                `,
                params:{id:id,userId:userId}
            }).then(res.json('success'))
            

        }else{res.status(404).json({massage:"user not found"})}

        
        
    }
    catch(err){console.log(err);res.status(401).json({error : err});};

};


exports.resetPassword = async(req,res,next)=>{
    const id = req.params.id;
    const userId = req.query.userId;
    const request = await forgotPasswordTable.findOne({where:{id}});
    if(request){

        request.update({active:false});
        res.send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>

            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <input type="hidden" value="${userId}" name='userId'></input>
                <button>reset password</button>
            </form>
        </html>`)
        res.end();
    }
    
};

exports.updatePassword = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const userId = req.query.userId;
        const password = req.query.newpassword;
        const result =await forgotPasswordTable.findOne({
            where:{id : id}
        });
        console.log(id,password,userId);

        if(result){
            const user = await usertable.findOne({where:{id:userId}});

            if(user){
                bcrypt.hash(password, 10, async(err,hash)=>{
                if(err){console.log(err)};
                await user.update({password:hash}).then(()=>{
                    res.json({massage:"success"});
                });
                
                });
            }

            else{res.status(404).json({massage:'user not found'})}
        }
        


    }catch(err){console.log(err)}
    

};