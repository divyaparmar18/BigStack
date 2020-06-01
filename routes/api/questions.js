const express = require('express');
const router = express.Router();

//@type  -  GET
//@route  -  /api/questions
//@desc  -  just for testing
//@access  -  PUBLIC
router.get('/',(req,res)=>{
    res.json({test:'questions are done'})
});

module.exports = router;