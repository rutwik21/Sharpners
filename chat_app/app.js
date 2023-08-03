const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const connection = require('./util/connection');

const userRoute = require('./routes/users');
const chatRoute = require('./routes/chat');

const user = require('./models/users');
const chat = require('./models/chat');
 
const app =express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('views'));

app.use('/user',userRoute);
app.use('/chat',chatRoute);

user.hasMany(chat);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));