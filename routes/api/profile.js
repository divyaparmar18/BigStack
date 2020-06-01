const express = require('express');
const router = express.Router();

//@type  -  GET
//@route  -  /api/profile
//@desc  -  just for testing
//@access  -  PUBLIC
router.get('/',(req,res)=>{
    res.json({test:'profile is success'})
});

module.exports = router;