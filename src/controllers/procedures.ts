const procedureToast = require('../messages/toasts');
const procedureModel = require('../models/procedures');

const listLastFiveProcedures = async (req: any, res: any) => {
  try {
    const lastProcedures = await procedureModel.getRecentProcedures();
    return res.status(200).json(lastProcedures.slice(0, 5));
  } catch (error: any) {
    return res.status(400).json(procedureToast.catchToast(error.message));
  }
};

module.exports = {
  listLastFiveProcedures,
};
