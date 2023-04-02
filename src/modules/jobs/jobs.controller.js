const catchAsync = require('../../utils/catchAsync');
const {jobsService} = require('./index');

const getUnpaidJobsByProfileId = catchAsync(async (req, res) => {
  const {profile} = req;
  const jobs = await jobsService.findUnpaidJobsByProfileId({
    req,
    profileId: profile.id,
  });
  if (!jobs) return res.status(404).end();
  res.json(jobs);
});

module.exports = {
  getUnpaidJobsByProfileId,
};
