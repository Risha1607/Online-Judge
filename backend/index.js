const express=require('express');
const app=express();
const {DBConnection}=require('./database/db.js');
const User=require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const dotenv=require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

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
            expiresIn:"24d"
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

app.post("/login",async (req,res)=>{
    console.log(req);
    try{
   const{email ,password}=req.body;
   if (!(email && password)){
    return res.status(400).send("Please fill all the required fields");

   }
   const user= await User.findOne({email});
   if (!user){
    return res.status(401).send("User not found!");
   }
   const enteredPassword=await bcrypt.compare(password,user.password);
   if (!enteredPassword){
    return res.status(401).send("Password is incorrect!");
   }
   const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24d",
});
user.token = token;
user.password = undefined;

const options = {
    expires: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
    httpOnly: true, 
};
res.status(200).cookie("token", token,options ).json({
    message: "You have successfully logged in !",
    success:true,
    token,
});



}
catch (error) {
    console.log(error.message)

}
   

});

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});