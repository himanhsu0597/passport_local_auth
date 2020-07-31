const LocalStrategy=require('passport-local').Strategy;
const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');


//Load user model

const User=require('../models/user');

module.exports=function(passport)
{
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done )=>{
            //match user
            User.findOne({email:email})
            .then(user => {
                if(!user)
                {
                    return done(null,false,{message:'That email is not registerd'});
                }

                //match password
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err)
                    {
                        console.log(err);
                        return;
                    }
                    if(isMatch)
                    {
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{message: "Password incorrect"});
                    }

                })
            })
            .catch(err => console.log(err));
        })
    );

//serializing the user to dcide which key is to be kept int the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialize the user frokm the key in the cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return  done(null,user);
    })
})

}