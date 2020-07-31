const User=require('../models/user')
const bcrypt=require('bcryptjs')
module.exports.loginPage=(req,res)=>{
    return res.render('login')
}
module.exports.registerPage=(req,res)=>{
    return res.render('register')
}


module.exports.register=(req,res)=>{
    const {name,email,password,password2}=req.body;

    let errors=[];

    //check required fields

    if(!name || !email || !password  || !password2)
    {
       // console.log(name,email,password,password2)
        console.log("Check 1")
        errors.push({msg:"please fill in all fields"});
    }
    //check password match
    if(password!==password2)
    {
        console.log("Check 2")
        errors.push({msg:"Password do not match"});
    }
    //chaeck pass length
    if(password.length<8)
    {
        console.log("Check 3")
        errors.push({msg:"Pasword should be atleast 8 characters long"})
    }
    if(errors.length>0)
    {
        console.log("Check 4")
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
       // res.redirect("back")
    }

        //validation passed
        User.findOne({email:email})
        .then((user)=>{
            if(user){
                //user exixts
                console.log(user);
                console.log("Check 5")
                errors.push({msg:"Email already exists"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser=new User({
                    name,
                    email,
                    password
                });
                //Hash Password
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err)
                        {
                            console.log(error);
                            return;
                        }
                        //set password to hash
                        newUser.password=hash;
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg','You are successfully registered and now can log in!')
                            res.redirect('/users/login');
                        })
                        .catch(err =>console.log(err) )
                    })
                })
            }
        })
}