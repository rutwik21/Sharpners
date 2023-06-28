const express = require("express");
const bodyP = require("body-parser");
const cors = require('cors');
const connection = require('./util/connection');

const userRoute = require('./routes/user');
const expenceRoute = require('./routes/expence');

const user = require('./models/user');
const expence = require('./models/expence');
 
const app =express();


app.use(cors());
app.use(express.json());

app.use('/user',userRoute);
app.use('/expence',expenceRoute);

user.hasMany(expence);
expence.belongsTo(user);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
