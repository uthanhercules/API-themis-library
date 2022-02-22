const tokenVerifyModel = require('../models/admin');
const tokenVerifyToast = require('../messages/toasts');

// eslint-disable-next-line consistent-return
const tokenVerify = async (req: any, res: any, next: any) => {
  const userToken = {
    token: req.header('userToken'),
  };

  try {
    const userLoginIsValid = await tokenVerifyModel.verifyUserByToken(userToken.token);

    if (!userLoginIsValid) {
      return res.status(403).json(tokenVerifyToast.clientToast.error(3));
    }

    next();
  } catch (error: any) {
    return res.status(400).json(tokenVerifyToast.clientToast.error(3));
  }
};

module.exports = tokenVerify;
