const express = require('express');
const { register, login } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'User info', user: req.user });
});

module.exports = router;
