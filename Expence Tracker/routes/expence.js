const express = require('express');

const router = express.Router();

const expenceController = require('../controllers/expence');
const Autherization = require('../Middleware/Auth');

router.post('/addExpence',expenceController.addExpence);

router.get('/getExpence', Autherization.auth, expenceController.getExpence);

router.delete('/deleteExpence/:id',expenceController.deleteExpence);

router.get("/download",Autherization.auth , expenceController.download);

module.exports = router;