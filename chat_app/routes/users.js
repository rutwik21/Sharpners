const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.post('/signupUser',userController.signupUser);

module.exports = router;