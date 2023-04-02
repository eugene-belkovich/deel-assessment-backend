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

const payForJobById = catchAsync(async (req, res) => {
  const {profile} = req;
  const {jobId} = req.params;
  const job = await jobsService.payByJobId({
    profileId: profile.id,
    jobId,
    req,
  });
  if (!job) return res.status(404).end();
  res.json(job);
});

module.exports = {
  getUnpaidJobsByProfileId,
  payForJobById,
};
