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

    urls:[{type:Schema.Types.ObjectId , ref:"urls"}]

})

const User=model("users",userSchema);

module.exports=User;