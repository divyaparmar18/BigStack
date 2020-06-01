const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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

//@type  -  POST
//@route  -  /api/auth/register
//@desc  -  route for registration of users
//@access  -  PUBLIC

router.post('/register',(req,res)=>{
    Person.findOne({email : req.body.email})
    .then((person)=>{
        if(person){
            res.status(400).json({emailError : 'This email is already regitered on the site'})
        }
        else{
            const newPerson = new Person({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
            //Encrypt password using bcrypt
            bcrypt.genSalt(5,(err,salt)=>{
                bcrypt.hash(newPerson.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newPerson.password = hash;
                    newPerson
                    .save()
                    .then((person)=>{
                        res.json(person)
                    })
                    .catch((err)=>{
                        console.log(err);
                        
                    });
                })
            })

        }


    })
    .catch((err)=>{
        console.log(err);
        
    })
})

module.exports = router;