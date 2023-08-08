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
app.use(helmet());
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
  .then(result => app.listen(3000))
  .catch(err => console.log(err));