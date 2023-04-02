const {Op, QueryTypes} = require('sequelize');
const {sequelize} = require('../../model');
const { EntityError } = require("../../utils/errors");

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
  } catch (error) {
    throw error;
  }
};

const payByJobId = async ({req, jobId}) => {
  const {Profile, Job} = req.app.get('models');
  const transaction = await sequelize.transaction();
  try {
    const job = await getJob({jobId});

    if (!job) {
      throw new EntityError('Job does not exists');
    }
    const {price, paid, clientId, clientBalance, contractorId, contractorBalance} = job;

    if (paid) {
      throw new EntityError(`Job ${jobId} is already paid`);
    }

    if (clientBalance < price) {
      throw new EntityError(`Insuficient balance, please make a deposit. Job could be paid if client balance >= the amount to pay`);
    }

    const client = await Profile.findOne({
      where: {
        id: clientId,
      },
    });

    const contractor = await Profile.findOne({
      where: {
        id: contractorId,
      },
    });

    client.balance = client.balance - price;
    contractor.balance = contractor.balance + price;

    await Promise.all([
      client.save(),
      contractor.save(),
      Job.update({paid: true, paymentDate: new Date()}, {where: {id: jobId}}),
    ]);
    await transaction.commit();
    return {
      previousBalance: {
        clientBalance,
        contractorBalance,
      },
      currentBalance: {
        clientBalance: client.balance,
        contractorBalance: contractor.balance,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getJob = async ({jobId}) => {
  const jobs = await sequelize.query(
    `
      select
          j.id jobId,
          j.price price,
          j.paid paid,
          client.id clientId,
          client.balance clientBalance,
          contractor.id contractorId,
          contractor.balance contractorBalance
      from Jobs j
          left join Contracts c on c.id = j.ContractId
          left join Profiles client on c.ClientId = client.id
          left join Profiles contractor on c.ContractorId = contractor.id

      where j.id = :jobId
    `,
    {
      replacements: {
        jobId,
      },
      type: QueryTypes.SELECT,
    },
  );

  return jobs[0];
};


module.exports = {
  findUnpaidJobsByProfileId,
  payByJobId,
};
