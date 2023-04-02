const express = require('express');
const {getUnpaidJobsByProfileId, payForJobById} = require('./jobs.controller');
const { getProfile } = require("../../middleware/get-profile");

const router = express.Router();

router.route('/unpaid').get(getProfile, getUnpaidJobsByProfileId);

router.route('/:jobId/pay').post(getProfile, payForJobById);


module.exports = router;
