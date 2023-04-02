const express = require('express');
const contractsRoute = require('./modules/contracts/contracts.route');
const healthCheckRoute = require('./modules/health-check/health-check.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/contracts',
    route: contractsRoute,
  },
  {
    path: '/health-check',
    route: healthCheckRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
