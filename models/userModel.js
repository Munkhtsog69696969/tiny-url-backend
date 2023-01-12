const {Schema,Types,model}=require("mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

})

const User=model("users",userSchema);

module.exports=User;