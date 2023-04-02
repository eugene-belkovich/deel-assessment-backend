const express = require('express');
const adminRoute = require('./modules/admin/admin.route');
const balancesRoute = require('./modules/balances/balances.route');
const contractsRoute = require('./modules/contracts/contracts.route');
const jobsRoute = require('./modules/jobs/jobs.route');
const healthCheckRoute = require('./modules/health-check/health-check.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/balances',
    route: balancesRoute,
  },
  {
    path: '/contracts',
    route: contractsRoute,
  },
  {
    path: '/jobs',
    route: jobsRoute,
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
