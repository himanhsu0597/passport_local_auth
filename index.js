//require libraries
const express=require('express');
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
//import pages

//define variables  and functions
const app=express();
const port=process.env.PORT||3000;

//setting up layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);

//EJS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));




//ROUTES
app.use('/',require('./routes/index'))


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));