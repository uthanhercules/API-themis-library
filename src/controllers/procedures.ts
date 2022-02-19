const procedureToast = require('../messages/toasts');

const newProcedure = async (req: any, res: any) => {
  procedureToast.consoleToast.success(0);
  res.send(procedureToast.clientToast.success(0));
};

module.exports = {
  newProcedure,
};
