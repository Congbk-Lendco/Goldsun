const express = require('express');
const router = express.Router();
const {  getAllUsers } = require('../controllers/auth.controller');
router.get('/getUser', getAllUsers);

module.exports = router;
