const express = require("express");
const cors = require('cors');

const user = require('./database');


const app =express();


app.use(cors());
app.use(express.json());


try{
app.post('/saveUser',async (req,res,next)=>{

  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  let data = await user.create({name: name,phone: phone,email: email});
  res.json(data);
});

app.get('/getUser',async (req,res)=>{
  const users = await user.findAll();
  res.json(users);
});

app.patch('/updateUser/:id',async (req,res)=>{
  let Uid = req.params.id;
  
  let updateUser = await user.findByPk(Uid);
    updateUser.name = req.body.name;
    updateUser.phone = req.body.phone;
    updateUser.email = req.body.email;
    await updateUser.save();
    res.json(1);

});

app.delete('/deleteUser/:id', async (req,res)=>{
  let Uid = req.params.id;
  await user.destroy({ where: { id: Uid } });
  res.send('success');
});


}
catch(err)
{console.log(err)};

user
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));