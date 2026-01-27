const express = require('express');
const {protect} =require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',protect,(req,res)=>{
    res.json({
        message: `Welcome ${req.user.name} to your dashboard`,
        user: req.user
    });
});

module.exports = router;