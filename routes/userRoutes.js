const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.put('/profile/:id', auth, updateUser);

module.exports = router;
