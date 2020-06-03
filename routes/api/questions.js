const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Person model
const Person = require('../../models/person');
//load profile model
const Profile = require('../../models/Profile');
//load Question model
const Question = require('../../models/Question')

//@type  -  GET
//@route  -  /api/questions
//@desc  -  route for showing all questions
//@access  -  PUBLIC
router.get('/',(req,res)=>{
   Question.find().sort({date:'desc'})
   .then((questions)=>{
       res.json(questions)
   })
   .catch((err)=>{
       res.json({noQuestions : "no  questions to display"})
   })
});

//@type  -  POST
//@route  -  /api/questions
//@desc  -  route for submitting questions
//@access  -  PRIVATE
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const newQuestion = new Question({
        textone : req.body.textone,
        texttwo : req.body.texttwo,
        user : req.user.id,
        name : req.body.name
    });
    newQuestion.save()
    .then((question)=>{
        res.json(question)
    })
    .catch((err)=>{
        console.log("Unable to push question to databse :- " + err);
        
    })
})

module.exports = router;