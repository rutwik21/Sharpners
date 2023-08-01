const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.post('/signupUser',userController.signupUser);

router.post('/loginUser',userController.loginUser);

module.exports = router;