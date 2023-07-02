const express = require('express');

const router = express.Router();

const premiumController = require('../controllers/premium');
const Autherization = require('../Middleware/Auth');

router.get('/showLeaderboard', Autherization.auth, premiumController.showLeaderboard);

module.exports = router;