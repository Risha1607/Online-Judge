import cors from 'cors';
import express from 'express';
import router from './routes/routes.js';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/', router);

DBConnection();






app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});