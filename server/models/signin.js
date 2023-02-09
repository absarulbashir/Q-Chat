const mongoose = require("mongoose");
const {Schema} = mongoose;


const model = new Schema({

    username : {
        type:String,
        required:true,
        unique:true,
    },

    password : {
        type:String,
        unique:true,
        required:true,
    },

    messages : {
        type:JSON,
        required:false,
        unique:false,
    },

    avatar : {
        type:String,
        require:true,
    }

});

module.exports = mongoose.model("users",model);