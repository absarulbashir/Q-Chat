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


//SIGNUP : 
app.post("/api/auth/signin" ,async (req,res) =>{

    const {username,password,messages,avatar} = req.body;

    model.find({username:username},(err,data)=>{
        if(data.length>=1){
            res.json({
                error:"user with this email or password already exists"
            })
            
        }
        else{
            model.find({}, (err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let isMatch = data.filter((el)=>{
                        let match = bcrypt.compareSync(password,el.password);
                        if(match){
                            return el;
                        }
                    })

                    if(isMatch.length===0){
                        bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(password,salt,(err,hash)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    model({
                                        username,
                                        password:hash,
                                        messages,
                                        avatar,
                                    }).save();
                                }
                            })
                        })
                        res.json({
                            username,
                            messages,
                            avatar,
                        })
                    }
                    else{
                        res.json({
                            error:"user with this email or password already exists"
                        })
                    }
                }
            })
        }

        if(err){
            console.log(err);
        }
    })

}); //END SIGNUP SECTION...

//LOGIN :

app.post("/api/auth/login",(req,res)=>{
    const {username,password} = req.body;
    model.find({username},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data.length===0){
                res.json({
                    error:"No user found"
                })
            }
            else{
                let matched = bcrypt.compareSync(password,data[0].password);
                if(matched){
                    res.json({
                        username,
                        messages:data[0].messages,
                        avatar:data[0].avatar
                    })
                }
                else{
                    res.json({
                        error:"No user found"
                    })
                }
            }
        }
    })
})

app.listen(5000,()=>{
    console.log("Listening at port 5000 ...");
});
