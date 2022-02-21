const procedureDb = require('./connection');

const getRecentProcedures = async () => {
  const recentList = await procedureDb('procedures').select('procedure_number', 'customer_id', 'name', 'updated').orderBy('updated', 'DESC');
  return recentList;
};

module.exports = {
  getRecentProcedures,
};
