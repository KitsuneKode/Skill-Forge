// [x] CHECKED

const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  temp,
  refreshToken,
} = require('../controllers/auth.controller');
const { authenticateToken, getUser } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', getUser, registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', getUser, refreshToken);
router.post('/logout', authenticateToken, logoutUser);
//TODO:
router.post('/temp/', temp);
// router.post('/reset-password', resetPassword);

module.exports = router;
