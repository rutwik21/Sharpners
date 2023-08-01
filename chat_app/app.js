const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const connection = require('./util/connection');

const userRoute = require('./routes/users');

const user = require('./models/users');
 
const app =express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('views'));

app.use('/user',userRoute);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));