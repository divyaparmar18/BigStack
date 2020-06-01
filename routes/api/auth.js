const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonjwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../setup/myurl')
 
//@type  -  GET
//@route  -  /api/auth
//@desc  -  just for testing
//@access  -  PUBLIC

router.get('/',(req,res)=>{
    res.json({test:'auth is success'})
});

//Import Schema for person to register
const Person = require('../../models/person');  





module.exports = router;