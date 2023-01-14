const express=require("express");

const cors=require("cors");

const mongoose=require("mongoose");

const port=8000;

const app=express();

const connect=require("./db connector/db");

mongoose.set("strictQuery",false);

connect();

const userRouter=require("./routes/userRouter");

app.use(cors());

app.use(express.json());

app.use("/",userRouter);

app.listen(port,()=>{
    console.log("Server listening at",port);
})