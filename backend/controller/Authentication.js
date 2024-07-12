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

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "24h",
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
        res.status(500).send("Server error");
    }
};

export const getUserData = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

  export const saveUserCode = async (req, res) => {
    const { problemId, language, code } = req.body;
  
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the code entry already exists
      let codeEntry = user.codes.find(c => c.problemId.toString() === problemId && c.language === language);
  
      if (codeEntry) {
        // Update the existing code entry
        codeEntry.code = code;
      } else {
        // Add a new code entry
        user.codes.push({ problemId, language, code });
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Code saved successfully' });
    } catch (error) {
      console.error('Error saving user code:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


export const getUserCode = async (req, res) => {
    const { problemId } = req.params;
    const { language } = req.query;
  
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      const submission = user.codes.find(s => s.problemId.toString() === problemId && s.language === language);
  
      if (!submission) {
        return res.status(404).json({ message: 'No code found for this problem and language' });
      }
  
      res.status(200).json(submission);
    } catch (error) {
      console.error('Error fetching user code:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // controller/Authentication.js

// controller/Authentication.js





import Submission from '../models/Submission.js';
import Contest from '../models/Contest.js';

export const getProfileData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    const practiceSubmissions = await Submission.find({ userId, contestId: null })
      .populate('problemId', 'title') // Populate the title field of the problem
      .exec();
    const contestSubmissions = await Submission.find({ userId, contestId: { $ne: null } })
      .populate({
        path: 'contestId',
        select: 'name problems', // Populate contest name and problems
      })
      .exec();
    const contests = await Contest.find({ participants: userId }).exec();

    // Filter out submissions that reference deleted contests or problems
    const filteredPracticeSubmissions = practiceSubmissions.filter(submission => submission.problemId);
    const filteredContestSubmissions = contestSubmissions.filter(submission => submission.contestId && submission.problemId);

    const profileData = {
      user,
      practiceSubmissions: filteredPracticeSubmissions,
      contestSubmissions: filteredContestSubmissions,
      contests,
    };

    console.log('Profile data being sent:', JSON.stringify(profileData, null, 2));
    res.json(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


