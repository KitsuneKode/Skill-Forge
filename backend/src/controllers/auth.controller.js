//[x]  Checked

const User = require('../models/user.model');
const Learner = require('../models/learner.model');
const Instructor = require('../models/instructor.model');
const RefreshToken = require('../models/refresh-token.model');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utlis/jwtHelper');
const { refreshTokenJWTSecret } = require('../config/env');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const role = req.body.role;
    const user = req.user;

    if (req.userStatus === 'existing') {
      if (user.role.includes(role)) {
        return res
          .status(400)
          .json({ message: `User already has a ${role} account` });
      }
    }

    User.findByIdAndUpdate(
      user._id,
      { $addToSet: { role: role } }, // Add to the role array if it doesn't already exist
      { new: true } // Return the updated user document
    )
      .then((updatedUser) => {
        console.log('Updated User:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user roles:', error);
      });

    if (role === 'learner') {
      const learner = await Learner.create({
        user: user._id,
      });

      if (!learner) {
        if (req.userStatus === 'new') {
          User.findByIdAndDelete(user._id);
        }
        if (req.userStatus === 'existing') {
          User.findByIdAndUpdate(user._id, { $pull: { role } });
        }
        return res.status(500).json({
          message: 'Error creating the learner',
        });
      }
    }

    if (role === 'instructor') {
      const expertise = req.body.expertise;
      const bio = req.body.bio;
      const instructor = await Instructor.create({
        user: user._id,
        bio,
        expertise,
      });
      if (!instructor) {
        if (req.userStatus === 'new') {
          User.findByIdAndDelete(user._id);
        }
        if (req.userStatus === 'existing') {
          User.findByIdAndUpdate(user._id, { $pull: { role } });
        }
        return res.status(500).json({
          message: 'Error creating the instructor',
        });
      }
    }

    res.json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } Account created successfully`,
    });
  } catch (error) {
    console.log('error');
    res.status(500).json({
      message: 'Unexpected error occurred while creating the Account',
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User doesnot exists' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    if (role === 'learner') {
      const learner = await Learner.findOne({ user: user._id });
      if (!learner) {
        return res
          .status(401)
          .json({ error: 'Learner account doesnot exists' });
      }
    }

    if (role === 'instructor') {
      const instructor = await Instructor.findOne({ user: user._id });
      if (!instructor) {
        return res
          .status(401)
          .send({ error: 'instructor account doesnot exists' });
      }
    }

    const accessToken = generateAccessToken(user._id, role);
    const refreshToken = generateRefreshToken(user._id, role);

    //  Invalidate (blacklist) previous refresh tokens for this user
    await RefreshToken.updateMany(
      { user: user._id, blacklisted: false, role }, // Find active tokens for this user
      { blacklisted: true } // Mark them as blacklisted
    );

    const newRefreshToken = await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      role: role,
    });

    if (!newRefreshToken) {
      return res.status(500).json({ error: 'Error creating refresh token' });
    }

    // Send refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in the response body
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Login failed', error });
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
      user: req.user._id,
      role: req.body.role,
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
    if (!token) {
      return res.status(403).json({ message: 'Already logged out' });
    }
    const refreshToken = await RefreshToken.findOneAndUpdate(
      { user: user._id, token }, // Find the token
      { blacklisted: true }, // Mark as blacklisted
      { new: true }
    );

    if (!refreshToken) {
      return res.status(404).json({ message: 'Token not found' });
    }

    // Remove the refresh token cookie
    res.clearCookie('refreshToken');
    return res
      .status(200)
      .json({ message: 'Successfully logged out, token blacklisted' });
  } catch (error) {
    return res.status(500).json({ message: 'Logout failed', error });
  }
};

//HACK
const temp = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshTokenJWTSecret);
  jwt.verify(refreshToken, refreshTokenJWTSecret, (err, userData) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    console.log(userData);
  });
  return res.status(200).json({ message: 'Token verified' });
};

module.exports = {
  registerUser,
  refreshToken,
  loginUser,
  logoutUser,
  temp,
};
