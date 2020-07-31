const mongoose=require('mongoose');
const mongoURI=require('./keys').mongoURI;
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true});



const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"))

db.once('open',()=>{
    console.log("Connected to MongoDB")
})

module.exports=db;