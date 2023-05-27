const express = require('express');
const fs = require('fs');


const router= express.Router();

router.get('/chat',(req,res)=>{
    
    fs.readFile('chat.txt',(err,data)=>{
        if(err){
            console.log(err);
            data='No Chat Exist!';
        }else{
            res.send(`<html><title>chat app</title>
            <body>${data}
            <form onsubmit ="document.getElementById('username').value = localStorage.getItem('username')" 
            action='/' method='POST'>
            <input type='text' name= 'massage' placeholder='massage'>
            <input type='hidden' id='username' name='username'>
            <button type='submit'>Sent</button>
            </form>
            </body>
            </html>`);
        }
    })
});


router.post('/',(req,res)=>{
    let obj = `${req.body.username} : ${req.body.massage}`;
    fs.writeFile('chat.txt', obj,{flag:'a'},(err)=>
    err ? console.log(err) : res.redirect('/chat')
    )

});

module.exports = router;