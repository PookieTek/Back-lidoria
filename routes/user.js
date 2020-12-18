const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/admin', userController.login);
router.post('/signup', userController.signup);
router.post('/isauth', auth, userController.checkAuth);
module.exports = router;