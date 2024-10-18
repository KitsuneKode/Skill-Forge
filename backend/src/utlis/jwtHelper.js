const jwt = require('jsonwebtoken');
const {
  accessTokenJWTSecret,
  refreshTokenJWTSecret,
} = require('../config/env');

const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, accessTokenJWTSecret, { expiresIn: '60m' });
};

const generateRefreshToken = (userId, role) => {
  return jwt.sign({ userId, role }, refreshTokenJWTSecret, {
    expiresIn: '30d',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
