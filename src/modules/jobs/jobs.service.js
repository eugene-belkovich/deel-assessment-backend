const {Op} = require('sequelize');

const findUnpaidJobsByProfileId = ({req, profileId}) => {
  const {Job, Contract} = req.app.get('models');
  try {
    return Job.findAll({
      include: [
        {
          model: Contract,
          required: true,
          where: {
            [Op.or]: [
              {
                ContractorId: profileId
              },
              {
                ClientId: profileId
              }
            ],
            status: "in_progress",
          },
        },
      ],
      where: {
        paid: {
          [Op.not]: true
        },
      },
    });
  } catch (err) {
    throw err;
  }
};



module.exports = {
  findUnpaidJobsByProfileId,
};
