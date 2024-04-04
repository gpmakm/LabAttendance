const express=require('express')
const app=express()
const path=require('path')
const bp=require('body-parser')
const mongodb=require('mongodb')
const mongoose=require('mongoose');

app.use(bp.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log(`Server started`);
})
//Establishing connection
mongoose.connect('mongodb://127.0.0.1:27017/LabAttendance',{useNewUrlParser:true})
let con=mongoose.connection;

con.on('error',console.log.bind(console,"Connection error happened"));
con.once('open',()=>{
    console.log("Connection establishment success")
})

let structure=new mongoose.Schema({
    uname:String,
    regno:Number,
    rollno:Number
})

let osStudent=new mongoose.model('osStudent',structure);
//127.0.0.1:3000/dbms => API
app.get('/os',(request,response)=>{
    response.sendFile(path.join(__dirname,"osform.htm"))
    const params={ };
});

app.post('/os',async(req,res)=>{
    var data=new osStudent(req.body);
    let regno=req.body.regno;
    let datum=await osStudent.findOne({regno:regno})
    if (datum) {
        res.send("You have made your registration")
    } else {
        data.save().then(()=>{
            res.send("Data Saved!")
        }).catch((e)=>{
            res.status(400).send("Error happened in data saving");
        })
    }
   
})

