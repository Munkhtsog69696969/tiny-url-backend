const express=require("express");

require("dotenv").config();

const jwt=require("jsonwebtoken");

const {body, validationResult} = require('express-validator')   

const userRouter=express.Router();


const {getUsers}=require("../controller/userController");
const {createUser}=require("../controller/userController");
const {loginUser}=require("../controller/userController");
const {getSingleUserFromId}=require("../controller/userController");
const {createUrl}=require("../controller/userController");
const {redirect}=require("../controller/userController");
const {getHistory}=require("../controller/userController");

userRouter
    .get("/users",getUsers)
    .post("/signin",
        body('email').isEmail(),
        body('password').isLength({min: 6}),
        createUser
    )
    .post("/login",loginUser)
    .get("/getUser/:id",getSingleUserFromId)
    .post("/createUrl",createUrl)
    .get("/:shortUrl",redirect)
    .put("/history",getHistory)
module.exports=userRouter;