//[x]  Checked

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const { accessTokenJWTSecret } = require('../config/env');

const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log('Finding user', email);
    const findUser = await User.findOne({ email }).select('-password');
    if (!findUser) {
      const { firstName, lastName, password, role } = req.body;

      console.log('user not found');
      req.userStatus = 'new';
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      if (!user) {
        return res.status(500).json({
          message: 'Error creating the user',
        });
      }
      console.log('User created');
      req.user = user;
      next();
    }

    if (findUser) {
      req.userStatus = 'existing';
      req.user = findUser;
      console.log('User found');
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating the User account', error });
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    console.log('Authenticating token');
    const decoded = jwt.verify(token, accessTokenJWTSecret);
    console.log('Token verified');
    const user = await User.findOne({ _id: decoded.userId }).select(
      '-password'
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    console.log('User authenticated');

    next();
  } catch (error) {
    console.log('Token invalid');
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

const authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      console.log('Authenticating role', req.user.role);
      if (!req.user.role) {
        return res.status(403).send({ error: 'Access denied. No roles found' });
      }

      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, accessTokenJWTSecret);

      if (
        !req.user.role.includes(requiredRole) ||
        decoded.role !== requiredRole
      ) {
        return res
          .status(403)
          .send({ error: 'Access denied, not authorised role' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Something went wrong', error });
    }
  };
};

module.exports = { authenticateToken, authenticateRole, getUser };
