

const express = require('express');

const adminProductController = require('../controller/adminProductController');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminProductController.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminProductController.postProduct);

module.exports = router;
