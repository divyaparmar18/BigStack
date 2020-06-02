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
});

//@type  -  POST
//@route  -  /api/profile
//@desc  -  route for UPDATING/PERSONAL personal user profile
//@access  -  PRIVATE
router.post(
    '/',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const profileValues =  {};
        profileValues.user = req.user.id;
        if(req.body.username)profileValues.username = req.body.username;
        if(req.body.website)profileValues.website = req.body.website;
        if(req.body.country)profileValues.country = req.body.country;
        if(req.body.portfolio)profileValues.portfolio = req.body.portfolio;
        if(typeof req.body.languages !== undefined){
            profileValues.languages = req.body.languages.split(',')
        }
        //get Social links
        profileValues.social = {};
        if(req.body.youtube)profileValues.social.youtube = req.body.youtube;
        if(req.body.facebook)profileValues.social.facebook = req.body.facebook;
        if(req.body.instagram)profileValues.social.instagram = req.body.instagram;

        //Do database stuff here
        Profile.findOne({user : req.user.id})
        .then((profile)=>{
            if(profile){
                Profile.findOneAndUpdate(
                    {user : req.user.id},
                    {$set : profileValues},
                    {new : true}
                )
                .then((profile)=>{
                    res.json(profile)
                })
                .catch((err)=>{
                    console.log("prblem in update :- " +   err);
                    
                })

            }
            else{
                Profile.findOne({username : profileValues.username})
                .then((profile)=>{
                    if(profile){
                        res.status(400).json({usrname : 'username already exists'})
                    }
                    //save new user
                    new Profile(profileValues)
                    .save()
                    .then((profile)=>{
                        res.json(profile)
                    })
                    .catch((err)=>{
                        console.log("save user " + err);
                        
                    })
                })
                .catch((err)=>{
                    console.log("prblm in the else of updating " + err);
                    
                })
            }
        })
        .catch((err)=>{
            console.log("Problem in fetching in profile :- " + err);
            
        })
});

//@type  -  GET
//@route  -  /api/profile/:username
//@desc  -  route for getting user profile based on USERNAME
//@access  -  PUBLIC

router.get('/:username',(req,res)=>{
    Profile.findOne({username:req.params.username})
    .populate('user',['name','profilepic'])
    .then((profile)=>{
        if(!profile){
            return res.status(404).json({userError : "user not found"})
        }
        res.json(profile)
    })
    .catch((err)=>{
        console.log("error in fetching username " + err);
        
    })
})












module.exports = router;