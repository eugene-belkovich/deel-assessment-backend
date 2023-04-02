const express = require('express');
const {getContractById} = require('./contracts.controller');
const { getProfile } = require("../../middleware/get-profile");

const router = express.Router();

router.route('/:id').get(getProfile, getContractById);

module.exports = router;
