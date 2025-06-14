const express = require('express');
const router = express.Router();
const { loginUser, registerUser , getAllUsers } = require('../controllers/auth.controller');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/getUser', getAllUsers);

module.exports = router;
