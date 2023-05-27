const express = require('express');

const router= express.Router();

router.get('/login',(req,res)=>{
    res.send(`<html><title>LOGIN</title>
    <body>
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value);"  
    action='/chat' method='GET'>
    <input type='text' id='username'>
    <button type='submit'>Login</button>
    </form>
    </body>
    </html>`);
   
});
module.exports = router;