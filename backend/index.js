const express=require('express');
const app=express();
const {DBConnection}=require('./database/db.js');
const User=require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const dotenv=require('dotenv');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

DBConnection();

app.get("/", (req,res)=>{
    res.send("Welcome to the today's class!");

});
app.post("/register",async (req,res)=>{
    console.log(req);
    try{
        const{firstname,lastname,email,password}=req.body;

        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Please enter all the required fields!")
        }

        const existingUser=await User.findOne({email})
       
        if(existingUser){
            return res.status(400).send("User already exists!");
        }
        const hashPassword = bcrypt.hashSync(password,10);
        console.log(hashPassword);
        const user=await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,

        });

        const  token = jwt.sign({ id: user._id ,email}, process.env.SECRET_KEY,{
            expiresIn:"1h"
        });
        user.token=token;
        user.password=undefined;
        res.status(201).json({
            message:"You have successfully registered!",
            user
        });


}
    catch (error){
        console.error(error)

    }

});

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});