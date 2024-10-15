const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');
const {
  authenticateRole,
  authenticateToken,
} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

//TODO:
router.post('/logout', logoutUser);
// router.post('/reset-password', resetPassword);
// router.post('/refresh-token', refreshToken);

module.exports = router;
