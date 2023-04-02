const express = require('express');
const {makeDeposit} = require('./balances.controller');
const { getProfile } = require("../../middleware/get-profile");

const router = express.Router();

router.route('/deposit/:userId').post(getProfile, makeDeposit);

module.exports = router;
