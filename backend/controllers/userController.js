const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      settings: user.settings,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      settings: user.settings,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      settings: user.settings,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.settings.theme = req.body.settings?.theme || user.settings.theme;
    user.settings.currency = req.body.settings?.currency || user.settings.currency;
    user.settings.notifications = req.body.settings?.notifications !== undefined ? req.body.settings.notifications : user.settings.notifications;

    try {
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        settings: updatedUser.settings,
        token: generateToken(updatedUser._id),
      });
    } catch (error) {
      res.status(400);
      throw new Error('Error updating user profile');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
const updateUserSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.settings.theme = req.body.theme || user.settings.theme;
    user.settings.currency = req.body.currency || user.settings.currency;
    user.settings.notifications = user.settings.notifications = req.body.notifications !== undefined ? req.body.notifications : user.settings.notifications;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      settings: updatedUser.settings,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
};




