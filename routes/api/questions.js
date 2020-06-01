const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({test:'questions are done'})
});

module.exports = router;