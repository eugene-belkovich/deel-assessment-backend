const catchAsync = require("../../utils/catchAsync");

const getHealthCheck = catchAsync(async (req, res) => {
  res.json("OK");
});

module.exports = {
  getHealthCheck,
};
