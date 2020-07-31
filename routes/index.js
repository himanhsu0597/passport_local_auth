const express=require('express');
const router =express.Router();
const passport=require('passport');
const homeController=require('../controllers/home_controller')
console.log("Router Included");

router.get('/',homeController.home)

router.get('/dashboard',passport.checkAuthentication,function(req,res){
    console.log(req.body);
    res.render('dashboard',{
        user:req.user
    });
})

router.use('/users',require('./users'));

module.exports=router;