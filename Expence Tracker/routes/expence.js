const express = require('express');

const router = express.Router();

const expenceController = require('../controllers/expence');

router.post('/addExpence',expenceController.addExpence);

router.get('/getExpence',expenceController.getExpence);

router.delete('/deleteExpence/:id',expenceController.deleteExpence);

module.exports = router;