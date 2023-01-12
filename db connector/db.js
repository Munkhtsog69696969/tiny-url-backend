const mongoose=require("mongoose");

const uri="mongodb+srv://Munkhtsog:password@cluster0.0lcnmk0.mongodb.net/tinyUrlDb?retryWrites=true&w=majority";

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("db");
    }catch(error){
        console.log(error);
    }
}

module.exports=connect;