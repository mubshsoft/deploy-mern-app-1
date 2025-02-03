const express = require("express");
const ensureAuthenticated = require("../middlewares/Auth");
const router = express.Router();


router.get("/",ensureAuthenticated,(req,res)=>{
    console.log('----login user--------', req.user);
    res.status(200)
    .json([
        {
            name: 'mobile', 
            price :10000
        }, {
            name : 'laptop',
            price : 80000
        }
    ])
} );


module.exports = router;
