const express = require('express');
const {getHealthCheck} = require('./health-check.controller');
const router = express.Router();

router.route('/').get(getHealthCheck);

module.exports = router;
