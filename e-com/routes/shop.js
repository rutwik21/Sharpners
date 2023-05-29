

const express = require('express');

const shopController = require('../controller/shopController');

const router = express.Router();

router.get('/', shopController.getShopPage);

router.get('/contactus', shopController.getContactusPage);

router.post('/success', shopController.getSuccessPage);

module.exports = router;
