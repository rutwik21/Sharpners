const express = require('express');

const router = express.Router();

const groupController = require('../controllers/group');

router.post('/createGroup',groupController.createGroup);

router.get('/getGroup',groupController.getGroup);

router.get('/getGroupById',groupController.getGroupById);

module.exports = router;