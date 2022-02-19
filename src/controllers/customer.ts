const customerToast = require('../messages/toasts');

const newCustomer = async (req: any, res: any) => {
  customerToast.consoleToast.success(0);
  res.send(customerToast.clientToast.success(0));
};

module.exports = {
  newCustomer,
};
