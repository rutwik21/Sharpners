const express = require("express");
const bodyP = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const connection = require('./util/connection');


const userRoute = require('./routes/user');
const expenceRoute = require('./routes/expence');
const orderRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const passwordRoute = require('./routes/password');

const user = require('./models/user');
const expence = require('./models/expence');
const order = require('./models/orders');
 
const app =express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'data.log'))

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
app.use(morgan('combined', {stream: accessLogStream}))
app.use(express.json());
app.use(express.static('views'));

app.use('/user',userRoute);
app.use('/expence',expenceRoute);
app.use('/purchase', orderRoute);
app.use('/premium', premiumRoute);
app.use('/password', passwordRoute);


user.hasMany(expence);
expence.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

connection
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
