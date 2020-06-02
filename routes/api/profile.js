const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Person = require('../../models/person');
const Profile = require('../../models/Profile')

//@type  -  GET
//@route  -  /api/profile
//@desc  -  route for personal user profile
//@access  -  PRIVATE
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then((profile)=>{
        if(!profile){
            res.status(404).json({profileError : "No profile found"})
        }
        res.json(profile)
    })
    .catch((err)=>{
        console.log("got some error in profile" + err);
        
    })
})

module.exports = router;