const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('hello big stsck')
})

const port = process.env.PORT || 4000;

app.listen(port,(req,res)=>{
    console.log('your server is running');
    
})