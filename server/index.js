const express = require("express");
const cors = require("cors");
const model = require("./models/signin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const salt = 10;

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
mongoose.set("strictQuery", false);


//Connecting to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/Q-chat")
.then(()=>{
    console.log("Connected to the db");
}).catch((err)=>{
    console.log(err);
});


//Handling the requests.

app.post("/api/auth/signin" ,async (req,res) =>{

    const {username,password,messages,avatar} = req.body;

    model.find({username:username},(err,data)=>{
        if(data.length>=1){
            res.json({
                error:"user already exists",
            })
            
        }
        else{
            model.find({},async (err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    for(let i=0;i<data.length;i++){
                        bcrypt.compare(password,data[i].password)
                        .then((match)=>{
                            if(match){
                              res.json({error:"user already exists"});
                              return true;
                            }

                        }).then((mtch)=>{
                            
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                        
                    }
                    
                }
            })
        }

        if(err){
            console.log(err);
        }
    })

})


app.listen(5000,()=>{
    console.log("Listening at port 5000 ...");
})
