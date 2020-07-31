//require libraries
const express=require('express');
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const MongoStore=require('connect-mongo')(session);

//import pages
require('./config/passport_local')(passport);

//define variables  and functions
const app=express();
const port=process.env.PORT||2000;

//setting up layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);

//body_parser
app.use(express.urlencoded({extended:false}))

//express session
app.use(session({
    //Todo cahnge the secret before deployment in production mode
    secret:"blahblah",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        
        mongooseConnection:db,
        autoRemove:'disabled'
    
},function(err)
{
    console.log(err || "connect-mongodb setup store")
})
}))
//Passport middleware

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//connect flash
app.use(flash());

//global variables

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash("error_msg");
    next();
})

//EJS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));




//ROUTES
app.use('/',require('./routes/index'))


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));