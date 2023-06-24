const express = require("express");
const bodyP = require("body-parser");
const cors = require('cors');
const connection = require('./util/connection');

const userRoute = require('./routes/user');

const app =express();


app.use(cors());
app.use(express.json());

app.use('/user',userRoute);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
