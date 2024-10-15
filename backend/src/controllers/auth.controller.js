const User = require('../models/user.model');
const Learner = require('../models/learner.model');
const Instructor = require('../models/instructor.model');
const RefreshToken = require('../models/refresh-token.model');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utlis/jwtHelper');
const { refreshTokenJWTSecret } = require('../config/env');

const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
    });

    if (!user) {
      return res.status(500).json({
        message: 'Error creating the user',
      });
    }

    if (req.body.role === 'learner') {
      const learner = await Learner.create({
        user: user._id,
      });

      if (!learner) {
        return res.status(500).json({
          message: 'Error creating the learner',
        });
      }
    }

    if (req.body.role === 'instructor') {
      const instructor = await Instructor.create({
        user: user._id,
      });
      if (!instructor) {
        return res.status(500).json({
          message: 'Error creating the instructor',
        });
      }
    }

    res.json({
      message: 'Account created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unexpected error occurred while creating the user',
      error,
    });
  }
};

//
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User doesnot exists' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    if (role === 'learner') {
      const learner = Learner.findOne({ user: user._id });
      if (!learner) {
        return res
          .status(401)
          .json({ error: 'Learner account doesnot exists' });
      }
    }

    if (role === 'instructor') {
      const instructor = Instructor.findOne({ user: user._id });
      if (!instructor) {
        return res
          .status(401)
          .send({ error: 'instructor account doesnot exists' });
      }
    }

    const accessToken = generateAccessToken(user._id, role);
    const refreshToken = generateRefreshToken(user._id, role);

    const newRefreshToken = await RefreshToken.create({
      user: user._id,
      token: refreshToken,
    });

    if (!newRefreshToken) {
      return res.status(500).json({ error: 'Error creating refresh token' });
    }

    //  Invalidate (blacklist) previous refresh tokens for this user
    await RefreshToken.updateMany(
      { user: user._id, blacklisted: false, role }, // Find active tokens for this user
      { blacklisted: true } // Mark them as blacklisted
    );

    // Send refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in the response body
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

const refreshToken = async (req, res) => {
  try {
    // 1. Get the refresh token from the cookies
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh token missing' });
    }

    // 2. Check if the refresh token is valid (find it in the database)
    const token = await RefreshToken.findOne({
      token: refreshToken,
      blacklisted: false,
    });

    if (!token) {
      return res
        .status(403)
        .json({ message: 'Invalid or blacklisted refresh token' });
    }

    // 3. Verify the refresh token using jwt.verify
    jwt.verify(refreshToken, refreshTokenJWTSecret, (err, userData) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // 4. If token is valid, issue a new access token
      const newAccessToken = generateAccessToken(
        userData.userId,
        userData.role
      );

      // 5. Send the new access token in the response
      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = req.user; // User to blacklist token for
    const token = req.cookies.refreshToken; // Token to blacklist
    const refreshToken = await RefreshToken.findOneAndUpdate(
      { user: user._id, token }, // Find the token
      { blacklisted: true }, // Mark as blacklisted
      { new: true }
    );

    if (!refreshToken) {
      return res.status(404).json({ message: 'Token not found' });
    }

    res
      .status(200)
      .json({ message: 'Successfully logged out, token blacklisted' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};

module.exports = {
  registerUser,
  refreshToken,
  loginUser,
  logoutUser,
};
