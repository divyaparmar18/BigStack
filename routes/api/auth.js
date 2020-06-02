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
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name
    if(email !== undefined && password !== undefined && name !== undefined){
        Person.findOne({email})
        .then((person)=>{
            if(person){
                res.status(400).json({emailError : 'This email is already regitered on the site'})
            }
            else{
                const newPerson = new Person({
                    name : name,
                    email : email,
                    password : password
                });
                //Encrypt password using bcrypt
                bcrypt.genSalt(5,(err,salt)=>{
                    bcrypt.hash(newPerson.password,salt,(err,hash)=>{
                        if(err) throw (err);
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
        });
    }
    else{
        res.status(400).json({Error : "Email, name and passwords are required"})
    }
})

//@type  -  POST
//@route  -  /api/auth/login
//@desc  -  route for login of users
//@access  -  PUBLIC
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(email !== undefined && password !== undefined ){
    Person.findOne({email})
    .then((person)=>{
        if(!person){
            return res.status(400).json({emailError : "user not found with this email you can register"})
        }
         bcrypt.compare(password,person.password)
            .then((isCorrect)=>{
             if(isCorrect){
                //  res.json({sucess : 'login successfully'})
                //use payload and create token for user
                const payload = {
                    id : person.id,
                    name : person.name,
                    email : person.email
                };
                jsonjwt.sign(
                    payload,
                    key.secret,
                    {expiresIn : 3600},
                    (err,token)=>{
                        if(err) throw (err);
                        res.json({
                            success : true,
                            token : "Bearer " + token,
                            

                        })
                        
                    }
                )

             }
             else{
                 res.status(400).json({passwprdError:'passwprd is not correct'})
             }
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}
else{
    res.status(400).json({Error : "email and password is required"})
    }
});

//@type  -  GET
//@route  -  /api/auth/profile
//@desc  -  route for user prolife
//@access  -  PRIVATE
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id : req.user.id,
        name : req.user.name,
        email : req.user.email,
        profilepic : req.user.profilepic
    })
    
})

module.exports = router;