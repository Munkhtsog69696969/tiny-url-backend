const User=require("../models/userModel");
const Url=require("../models/urlModel");
const randomstring=require("randomstring");
const jwt=require("jsonwebtoken")

const {body, validationResult} = require('express-validator')

exports.getUsers=async(req,res)=>{
    // const users=await User.find({});

    // res.send(users);
    res.send("kk")
}

exports.createUser=async(req,res,next)=>{
    // const errors = validationResult(req);
    // const email=req.body.email;
    // const existingEmail=await User.find({email})
    // try {
    //     if(existingEmail==""){
    //         if (!errors.isEmpty() && errors.errors[0].param === 'email') {
    //             res.send('Invalid email address. Please try again.')
    //         }else if(!errors.isEmpty() && errors.errors[0].param === 'password'){
    //             res.send('Password must be longer than 6 characters.')
    //         }else{
    //             const user = await User.create(req.body)
    //             user.save();
    //             res.send(user)
    //         }
    //     }else{
    //         res.send("Email exists.")
    //     }
    // } catch (err) {
    //     res.send(err)
    // }

    const accessToken=jwt.sign(
        {email:req.body.email , id:"email"},
        process.env.ACCESS_TOKEN_SECRET || "defaultSecret",
        {expiresIn:"1d"}
    )

    res.json({accessToken:accessToken})

}


exports.loginUser=async(req,res)=>{
    const email=req.body.email;

    const password=req.body.password;

    const user=await User.find({email})

    if(user==""){
        res.send("Email doesnt exist.");
    }else{
        if(password===user[0].password){
            res.send(user);
        }else{
            res.send("Email or password incorrect.")
        }
    }

}

exports.getSingleUserFromId=async(req,res)=>{
    const id=req.params.id;

    const user=await User.findById(id);

    res.send(user);
}

exports.createUrl=async(req,res)=>{
    const longUrl=req.body.longUrl;
    const shortUrl="http://localhost:8000/"+randomstring.generate(6);

    const url=await Url.create({longUrl , shortUrl});

    url.save();

    res.send(url);
}

exports.redirect=async(req,res)=>{
    const shortUrlEnd=req.params.shortUrl;

    const shortUrl="http://localhost:8000/"+shortUrlEnd;

    const data=await Url.find({shortUrl});

    if(data!==null) return res.redirect(data[0].longUrl);
}

exports.getHistory=async(req,res)=>{
    const datas=await Url.find({});

    res.send(datas);
}
