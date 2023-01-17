const express=require("express");

require("dotenv").config();

const jwt=require("jsonwebtoken");

const {body, validationResult} = require('express-validator')

const userRouter=express.Router();

function authenticateToken(req,res,next){
    const token=req.headers.authorization;
    // const authHeader=req.headers["authorization"];
    // const token=authHeader && authHeader.split(" ")[1];

    if(token==null) return res.sendStatus(401);


    jwt.verify(
        token,
        process.env.SECRET_TOKEN || "defaultSecret",
        (err,result)=>{
            if(err){
                return res.sendStatus(403);
            }else{
                req.email=result;

                next();
            }
        }
    )
}

const {getUsers}=require("../controller/userController");
const {createUser}=require("../controller/userController");
const {loginUser}=require("../controller/userController");
const {getSingleUserFromId}=require("../controller/userController");
const {createUrl}=require("../controller/userController");
const {redirect}=require("../controller/userController");
const {getHistory}=require("../controller/userController");

userRouter
    .get("/users",authenticateToken,getUsers)
    .post("/signin",
        body('email').isEmail(),
        body('password').isLength({min: 6}),
        createUser
    )
    .post("/login",loginUser)
    .get("/getUser/:id",getSingleUserFromId)
    .post("/createUrl",createUrl)
    .get("/:shortUrl",redirect)
    .get("/history",getHistory)
module.exports=userRouter;