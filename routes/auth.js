require('dotenv').config();
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const verify = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    let token = req.header('Authorization') || '';
    token = token.replace('Bearer ', '');
    
    // If token is not provided
    if (!token) {
      return res.status(401).send({
        status: 'ERROR',
        error: { code: '2', message: 'Access Denied. No token provided.' },
      });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.Bosecret); // Correct environment variable name
    
    req.user = verified;
    

    // Fetch the user from the database
    const userId = req.user.userid;
    console.log("----###----",userId);
    const adminUser = await User.findOne({ where: { user_id: userId } });

    // If user not found
    if (!adminUser) {
      return res.status(404).send({
        status: 'ERROR',
        error: { code: '3', message: 'User not found.' },
      });
    }

    // Attach role_id to req.user
    req.user.roleid = adminUser.role_id;

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Handle invalid token or other errors
    return res.status(400).send({
      status: 'ERROR',
      error: { code: '25', message: 'Invalid token.' },
    });
  }
};

module.exports = { verify };
