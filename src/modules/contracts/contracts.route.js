const express = require('express');
const {getContractById, getContractsByProfileId } = require('./contracts.controller');
const { getProfile } = require("../../middleware/get-profile");

const router = express.Router();

router.route('/').get(getProfile, getContractsByProfileId);

router.route('/:id').get(getProfile, getContractById);

module.exports = router;
