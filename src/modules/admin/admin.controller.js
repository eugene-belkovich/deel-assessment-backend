const {adminService} = require('./index');
const catchAsync = require('../../utils/catchAsync');

const getBestProfession = catchAsync(async (req, res) => {
  const params = {
    req,
    startDate: new Date(req.query.start),
    endDate: new Date(req.query.end),
  };
  const bestProfession = await adminService.getBestProfessionByDate(params);
  if (!bestProfession) return res.status(404).end();
  res.json(bestProfession);
});

const getBestClients = catchAsync(async (req, res) => {
  const params = {
    req,
    startDate: new Date(req.query.start),
    endDate: new Date(req.query.end),
    limit: req.query.limit ?? 2,
  };
  const bestClients = await adminService.getBestClients(params);
  if (!bestClients) return res.status(404).end();
  res.json(bestClients);
});

module.exports = {
  getBestProfession,
  getBestClients,
};
