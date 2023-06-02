const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const contactController = require('../controllers/contactus');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/contactus',contactController.contactus);
router.post('/success', contactController.getSuccess);


module.exports = router;
