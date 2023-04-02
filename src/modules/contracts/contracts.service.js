const {Op} = require('sequelize');

const findById = ({req, profileId, id}) => {
  const {Contract, Profile} = req.app.get('models');
  try {
    return Contract.findOne({
      include: [
        {
          model: Profile,
          attributes: ['id'],
          as: 'Client',
        },
        {
          model: Profile,
          attributes: ['id'],
          as: 'Contractor',
        },
      ],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                Clientid: profileId,
              },
              {
                Contractorid: profileId,
              },
            ],
          },
          {
            id,
          },
        ],
      },
    });
  } catch (err) {
    throw err;
  }
};

const findAllByProfile = ({profileId, req}) => {
  const {Contract, Profile} = req.app.get('models');
  try {
    return Contract.findAll({
      include: [
        {
          model: Profile,
          attributes: ['id'],
          as: 'Client',
        },
        {
          model: Profile,
          attributes: ['id'],
          as: 'Contractor',
        },
      ],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                Clientid: profileId,
              },
              {
                Contractorid: profileId,
              },
            ],
          },
          {
            status: {
              [Op.notIn]: ['terminated'],
            },
          },
        ],
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findById,
  findAllByProfile,
};
