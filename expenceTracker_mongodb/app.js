const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');


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


// user.hasMany(expence);
// expence.belongsTo(user);

// user.hasMany(order);
// order.belongsTo(user);
mongoose
.connect('mongodb+srv://rutwik2:y2z9aqAXbkclmeeV@cluster0.k58beuq.mongodb.net/expence_tracker?retryWrites=true&w=majority')
.then(()=>{
  app.listen(3000);
  console.log('connected!')
})
.catch(err=>{
  console.log(err);
})

// connection
//   .sync()
//   .then(result => )
//   .catch(err => console.log(err));
