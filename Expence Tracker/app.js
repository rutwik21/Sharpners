const express = require("express");
const bodyP = require("body-parser");
const cors = require('cors');
const connection = require('./util/connection');

const userRoute = require('./routes/user');
const expenceRoute = require('./routes/expence');
const orderRoute = require('./routes/purchase')

const user = require('./models/user');
const expence = require('./models/expence');
const order = require('./models/orders');
 
const app =express();


app.use(cors());
app.use(express.json());

app.use('/user',userRoute);
app.use('/expence',expenceRoute);
app.use('/purchase', orderRoute);

user.hasMany(expence);
expence.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
