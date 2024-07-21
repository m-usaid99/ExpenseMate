const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
  deleteUser,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);
router.route('/settings').put(protect, updateUserSettings);
router.post('/request-reset', requestPasswordReset);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
