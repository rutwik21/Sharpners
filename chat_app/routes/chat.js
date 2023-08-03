const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');

router.post('/newChat',chatController.newChat);

router.get('/getChat',chatController.getChat);

module.exports = router;