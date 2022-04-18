import knex from '../models/connection';

const listProcedures = async () => {
  const list = await knex('procedures').select('procedure_number', 'customer_id', 'name', 'updated').orderBy('updated', 'DESC');
  return list;
};

const listProcedureByNumber = async (procedureNumber: number) => {
  const list = await knex('procedures').select('*').where({ procedure_number: procedureNumber }).orderBy('updated', 'desc');
  return list;
};

const newProcedure = async (data: object) => {
  await knex('procedures').insert(data);
};

export = {
  listProcedures,
  listProcedureByNumber,
  newProcedure,
};
