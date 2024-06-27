import DBConnection from '../database/db.js';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

export const RegisterUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the required fields!");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role: role || 'user'
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "24d",
        });
        user.token = token;
        user.password = undefined;

        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("Please fill all the required fields");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect!");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "24d",
        });
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
            user
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

