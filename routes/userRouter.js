const express=require("express");

const {body, validationResult} = require('express-validator')

const jwt = require('jsonwebtoken');

const userRouter=express.Router();

const {getUsers}=require("../controller/userController");
const {createUser}=require("../controller/userController");
const {loginUser}=require("../controller/userController");
const {getSingleUserFromId}=require("../controller/userController");
const {createUrl}=require("../controller/userController");
const {redirect}=require("../controller/userController");
const {getHistory}=require("../controller/userController");


function authenticatToken(req,res,next){
    const token = req.headers.authorization;
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "defaultSecret",
        (err , result)=>{
            if (err) {
                return res.sendStatus(403)
            }else{
                res.send(result);

                next();
            }
        }
    )
}

userRouter
    .get("/users",authenticatToken,getUsers)
    .post("/signin",
        body('email').isEmail(),
        body('password').isLength({min: 6}),
        createUser
    )
    .post("/login",loginUser)
    // .post("/user", authenticatToken, )
    .get("/getUser/:id",getSingleUserFromId)
    .post("/createUrl",createUrl)
    .get("/:shortUrl",redirect)
    .get("/history",getHistory)
module.exports=userRouter;