const express=require('express');

const userController=require('../controllers/users_controller')

const router=express.Router();
//Login Page
router.get('/login',userController.loginPage);
//Register Page
router.get('/register',userController.registerPage);

//Register Form Action
router.post('/register',userController.register)
 module.exports=router;