const {v4: uuid} = require('uuid');
const catchAsync = require('../../utils/catchAsync');
const {balancesService} = require('./index');

const makeDeposit = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const {amount} = req.body;
  const params = {userId, amount};
  const balance = await balancesService.deposit({...params, req, reqId: uuid()});
  if (!balance) return res.status(404).end();
  res.json(balance);
});

module.exports = {
  makeDeposit,
};
