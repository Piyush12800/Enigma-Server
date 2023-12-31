const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String ,
        required:true,
        trim:true,
    },
    lastName:{
        type:String ,
        required:true,
        trim:true,
    },  
     email:{
        type:String ,
        required:true,
        trim:true,
    },
    password:{
        type:String ,
        required:true,
        
    },
    token:{
        type:String
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
      },
      image:{
        type:String
      }
})

module.exports = mongoose.model("User" , userSchema);