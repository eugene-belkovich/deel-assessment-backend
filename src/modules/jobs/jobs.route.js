const express = require('express');
const {getUnpaidJobsByProfileId} = require('./jobs.controller');
const { getProfile } = require("../../middleware/get-profile");

const router = express.Router();

router.route('/unpaid').get(getProfile, getUnpaidJobsByProfileId);

module.exports = router;
