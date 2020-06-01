const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({test:'profile is success'})
});

module.exports = router;