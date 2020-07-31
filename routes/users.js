const express=require('express');

const userController=require('../controllers/users_controller')

const router=express.Router();
//Login Page
router.get('/login',userController.loginPage);
//Register Page
router.get('/register',userController.registerPage);

//Register Form Action
router.post('/register',userController.register)

//Login Form Action
router.post('/login',userController.login)

//Logout

router.get('/logout',userController.logout)

 module.exports=router;