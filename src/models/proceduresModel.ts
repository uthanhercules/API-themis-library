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

const excludeProcedure = async (procedureNumber: number) => {
  await knex('procedures').delete().where({ procedure_number: procedureNumber });
};

const updateProcedure = async (data: object, procedureNumber: number) => {
  await knex('procedures').update(data).where({ procedure_number: procedureNumber });
};

export = {
  listProcedures,
  listProcedureByNumber,
  newProcedure,
  excludeProcedure,
  updateProcedure,
};
