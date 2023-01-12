const User=require("../models/userModel");

const {body, validationResult} = require('express-validator')

exports.getUsers=async(req,res)=>{
    const users=await User.find({});

    res.send(users);
}

exports.createUser=async(req,res,next)=>{
    const errors = validationResult(req);
    const email=req.body.email;
    const existingEmail=await User.find({email})
    try {
        if(existingEmail==""){
            if (!errors.isEmpty() && errors.errors[0].param === 'email') {
                res.send('Invalid email address. Please try again.')
            }else if(!errors.isEmpty() && errors.errors[0].param === 'password'){
                res.send('Password must be longer than 6 characters.')
            }else{
                const user = await User.create(req.body)
                user.save();
                res.send(user)
            }
        }else{
            res.send("Email exists.")
        }
    } catch (err) {
        next(err)
    }
}