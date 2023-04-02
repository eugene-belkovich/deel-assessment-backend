const {QueryTypes} = require('sequelize');
const {sequelize} = require('../../model');

const getBestProfessionByDate = ({startDate, endDate, limit = 1}) => {
  return sequelize.query(
    `
      select p.profession, sum(j.price) total_received
      from Profiles p
        left join Contracts c on p.id = c.ContractorId
        left join Jobs j on c.id = j.ContractId

      where (j.paid is true) and (j.paymentDate >= :startDate and j.paymentDate <= :endDate)
      group by p.profession
      order by total_received desc
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
};

const getBestClients = ({startDate, endDate, limit}) => {
  return sequelize.query(
    `
      select p.id, p.firstName name, sum(j.price) total_paid
      from Profiles p
        left join Contracts c on p.id = c.ClientId
        left join Jobs j on c.id = j.ContractId

      where (j.paid is true) and (j.paymentDate >= :startDate and j.paymentDate <= :endDate)
      group by P.id
      order by total_paid desc
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
};

module.exports = {
  getBestProfessionByDate,
  getBestClients,
};
