const express=require("express");

const {body, validationResult} = require('express-validator')

const userRouter=express.Router();

const {getUsers}=require("../controller/userController");
const {createUser}=require("../controller/userController");
const {loginUser}=require("../controller/userController");
const {getSingleUserFromId}=require("../controller/userController");
const {createUrl}=require("../controller/userController");

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
module.exports=userRouter;