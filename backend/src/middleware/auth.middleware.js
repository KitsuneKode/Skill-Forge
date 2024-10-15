const User = require('../models/user.model');
const Learner = require('../models/learner.model');
const instructor = require('../models/instructor.model');
const jwt = require('jsonwebtoken');

const {
  refreshTokenJWTSecret,
  accessTokenJWTSecret,
} = require('../config/env');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const decoded = jwt.verify(token, accessTokenJWTSecret);
    const user = await User.findOne({ _id: decoded.userId }).select(
      '-password'
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Not authorized, user not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

//FIXME
const authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user.role) {
        return res.status(403).send({ error: 'Access denied.' });
      }

      const hasAuthorizedRole = req.user.role.some((role) =>
        requiredRole.includes(role)
      );
      if (!hasAuthorizedRole) {
        return res.status(403).send({ error: 'Access denied.' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  };
};

module.exports = { authenticateToken, authenticateRole };
