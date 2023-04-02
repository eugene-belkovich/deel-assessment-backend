const {contractsService} = require('./index');
const catchAsync = require("../../utils/catchAsync");

const getContractById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const {profile} = req;
  const contract = await contractsService.findById({
    req,
    id,
    profileId: profile.id,
  });
  if (!contract) return res.status(404).end();
  res.json(contract);
});

module.exports = {
  getContractById,
};
