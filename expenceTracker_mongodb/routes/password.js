const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/password');

router.post('/forgotPassword', passwordController.forgotPassword);

router.get('/resetPassword/:id',passwordController.resetPassword);

router.get('/updatepassword/:id',passwordController.updatePassword);

module.exports = router;