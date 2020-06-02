const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

//bring all routes
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const questions = require('./routes/api/questions')

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//MongoDB configuration 
const db = require('./setup/myurl').mongoURL;
// console.log(db);


//Attemt to conncet db
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true  },)
.then(()=>{
    console.log('mongo db connected successfully')
})
.catch((err)=>{
    console.log(err);
});

//passport middleware
app.use(passport.initialize());

//config for jwt strategy
require('./Strategies/jsonwtStrategy')(passport);

//route test
app.get('/',(req,res)=>{
    res.send('hello big stsck')
});

app.use('/api/auth',auth);
app.use('/api/questions',questions);
app.use('/api/profile',profile)



const port = process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log('your server is running');
})