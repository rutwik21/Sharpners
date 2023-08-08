const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/getGroupMembers',adminController.getGroupMembers);

router.post('/makeAdmin',adminController.makeAdmin);

router.post('/removeMember',adminController.removeMember);

router.post('/searchMember',adminController.searchMember);

router.post('/addMember',adminController.addMember);

module.exports = router;