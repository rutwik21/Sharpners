const express = require("express");
const cors = require('cors');
const helmet = require('helmet');


const connection = require('./util/connection');

const userRoute = require('./routes/users');
const chatRoute = require('./routes/chat');
const groupRoute = require('./routes/group');
const adminRoute = require('./routes/admin');

const user = require('./models/users');
const chat = require('./models/chat');
const group = require('./models/group');
const joinedgroup = require("./models/joinedgroup");
 
const app =express();


app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src" : '*',
      "script-src": ['*',"'unsafe-inline'"],
      "script-src-attr":"'unsafe-inline'",
    },
  },
}));
app.use(express.json());
app.use(express.static('views'));

app.use('/user',userRoute);
app.use('/chat',chatRoute);
app.use('/group',groupRoute);
app.use('/admin',adminRoute);

chat.belongsTo(user);
chat.belongsTo(group);
user.hasMany(chat);
group.hasMany(chat);
joinedgroup.belongsTo(group);
joinedgroup.belongsTo(user);
group.belongsToMany(user,{through : joinedgroup});
user.belongsToMany(group,{through : joinedgroup});


connection
  .sync()
  .then(result => {
    const server =  app.listen(4000)
    const io = require('socket.io')(server);
    io.on('connection',socket =>{
      socket.on('joined-grp',groupId =>{
        socket.join(groupId);
      });
      socket.on('send-msg',(msg,groupId,name)=>{
        socket.to(groupId).emit('recive-msg',msg,name);
      })
    })
  })
  .catch(err => console.log(err));
  
  
  