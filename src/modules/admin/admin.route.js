const express = require('express');
const {getBestProfession, getBestClients} = require('./admin.controller');
const { getProfile } = require("../../middleware/get-profile");
const router = express.Router();

router.route('/best-profession').get(getProfile,getBestProfession);

router.route('/best-clients').get(getProfile, getBestClients);

module.exports = router;
