const express = require('express');
const mongoose = require('mongoose');

const app = express();

//MongoDB configuration 
const db = require('./setup/myurl').mongoURL 

//Attemt to conncet db
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true  },)
.then(()=>{
    console.log('mongo db connected successfully')
})
.catch((err)=>{
    console.log(err);
});


//route test
app.get('/',(req,res)=>{
    res.send('hello big stsck')
});

const port = process.env.PORT || 4000;

app.listen(port,(req,res)=>{
    console.log('your server is running');
})