const {QueryTypes} = require('sequelize');
const {sequelize} = require('../../model');

const getBestProfessionByDate = async ({startDate, endDate, limit = 1}) => {
  try {
    const result = await sequelize.query(
      `
      select p.profession, sum(j.price) totalReceived
      from Profiles p
        left join Contracts c on p.id = c.ContractorId
        left join Jobs j on c.id = j.ContractId

      where (j.paid is true) and (j.paymentDate >= :startDate and j.paymentDate <= :endDate)
      group by p.profession
      order by totalReceived desc
      limit :limit
    `,
      {
        replacements: {
          startDate,
          endDate,
          limit,
        },
        type: QueryTypes.SELECT,
      },
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};

const getBestClients = ({startDate, endDate, limit}) => {
  try {
    return sequelize.query(
      `
      select p.id, p.firstName name, sum(j.price) totalPaid
      from Profiles p
        left join Contracts c on p.id = c.ClientId
        left join Jobs j on c.id = j.ContractId

      where (j.paid is true) and (j.paymentDate >= :startDate and j.paymentDate <= :endDate)
      group by P.id
      order by totalPaid desc
      limit :limit
    `,
      {
        replacements: {
          startDate,
          endDate,
          limit,
        },
        type: QueryTypes.SELECT,
      },
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getBestProfessionByDate,
  getBestClients,
};
