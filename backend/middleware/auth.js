import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid', err });
  }
};

export default authMiddleware;





