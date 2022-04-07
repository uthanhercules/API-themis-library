import knex from '../models/connection';

const listProcedures = async () => {
  const list = await knex('procedures').select('procedure_number', 'customer_id', 'name', 'updated').orderBy('updated', 'DESC');
  return list;
};

export = {
  listProcedures,
};
