const {Schema,Types,model}=require("mongoose");

const urlSchema=new Schema({
    longUrl:{
        type:String,
        required:true,
    },

    shortUrl:{
        type:String,
        required:false,
    },

    userId:String

})

const Url=model("urls",urlSchema);

module.exports=Url;