const adminToast = require('../messages/toasts');

const adminTest = async (req: any, res: any) => {
  adminToast.consoleToast.success(0);
  res.send(adminToast.clientToast.success(0));
};

module.exports = {
  adminTest,
};
