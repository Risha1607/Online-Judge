// middleware/admin.js
import User from '../models/Users.js';

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export default isAdmin;