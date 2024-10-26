// src/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = createToken(user, process.env.JWT_SECRET, process.env.TOKEN_EXPIRATION);
    const refreshToken = createToken(user, process.env.JWT_REFRESH_SECRET, process.env.REFRESH_TOKEN_EXPIRATION);
    
    res.status(200).json({
      message: 'User signed in successfully',
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(403).json({ message: 'Refresh token required' });
    }

    const payload = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = createToken(payload, process.env.JWT_SECRET, process.env.TOKEN_EXPIRATION);
    const newRefreshToken = createToken(payload, process.env.JWT_REFRESH_SECRET, process.env.REFRESH_TOKEN_EXPIRATION);

    res.status(200).json({
      message: 'Token refreshed successfully',
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
