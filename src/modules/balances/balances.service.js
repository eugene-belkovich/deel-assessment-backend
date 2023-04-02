const {QueryTypes} = require('sequelize');
const {sequelize} = require('../../model');
const {EntityError} = require('../../utils/errors');

const MAX_BALANCE_TO_DEPOSIT_RATIO = 0.25;

const deposit = async ({amount, userId, req, reqId}) => {
  const {Profile} = req.app.get('models');
  const transaction = await sequelize.transaction();
  try {
    await validateDeposit({amount, userId, req});
    const profile = await Profile.findOne({
      where: {
        id: userId,
      },
    });
    const newBalance = profile.balance + amount;
    profile.balance = newBalance;
    await profile.save();
    await transaction.commit();
    return profile;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const validateDeposit = async ({amount, userId}) => {
  const response = await sequelize.query(
    `
      select p.id, sum(j.price) total_debit
      from Jobs j
        left join Contracts C on j.ContractId = C.id
        left join Profiles P on C.ClientId = P.id

      where (j.paid is null) and (p.id = :userId)
    `,
    {
      replacements: {
        userId,
      },
      type: QueryTypes.SELECT,
    },
  );
  const maxDepositAvailable = MAX_BALANCE_TO_DEPOSIT_RATIO * response[0].total_debit;
  if (amount > maxDepositAvailable) {
    throw new EntityError(`User can't deposit more than ${maxDepositAvailable} right now`);
  }
};

module.exports = {
  deposit,
};
