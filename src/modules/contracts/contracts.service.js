const {Op, QueryTypes } = require('sequelize');
const { sequelize } = require("../../model");

const findById = async ({profileId, id}) => {
  try {
    const result = await sequelize.query(
      `
      select
        c.id,
        c.terms,
        c.status,
        c.status,
        c.createdAt,
        c.updatedAt,
        c.ContractorId as contractorId,
        c.ClientId as clientId
      from Contracts c
               left join Profiles contractor on contractor.id = c.ContractorId
               left join Profiles client on client.id = c.ClientId
      where (ClientId = :profileId or ContractorId = :profileId) and (c.id = :id)
    `,
      {
        replacements: {
          id,
          profileId,
        },
        type: QueryTypes.SELECT,
      },
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};

const findAllByProfile = ({profileId}) => {
  try {
    return sequelize.query(
      `
      select *,
        c.ContractorId as contractorId,
        c.ClientId as clientId
      from Contracts c
               left join Profiles contractor on contractor.id = c.ContractorId
               left join Profiles client on client.id = c.ClientId
      where (ClientId = :profileId or ContractorId = :profileId) and (c.status not in ('terminated'))
    `,
      {
        replacements: {
          profileId,
        },
        type: QueryTypes.SELECT,
      },
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findById,
  findAllByProfile,
};
