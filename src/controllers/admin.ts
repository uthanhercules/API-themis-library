const adminToast = require('../messages/toasts');
const adminModel = require('../models/admin');

const adminLogin = async (req: any, res: any) => {
  const { username, password } = req.body;
  try {
    const listOfAdminWithUsername = await adminModel.getAdminByUsername(username);

    if (listOfAdminWithUsername.length === 0) {
      return res.status(404).json(adminToast.clientToast.error(1));
    }

    const passwordIsValid = await adminModel.verifyPassword(username, password);

    if (!passwordIsValid.ok) {
      return res.status(404).json(adminToast.clientToast.error(1));
    }

    const AdminLoginToken = await adminModel.generateAdminToken(passwordIsValid.id);
    return res.status(200).json(AdminLoginToken);
  } catch (error: any) {
    return res.status(400).json(adminToast.catchToast(error.message));
  }
};

const newPassword = async (req: any, res:any) => {
  const { username, password, recoveryKey } = req.body;
  try {
    const listOfAdminWithUsername = await adminModel.getAdminByUsername(username);

    if (listOfAdminWithUsername.length === 0) {
      return res.status(404).json(adminToast.clientToast.error(1));
    }

    const recoveryKeyIsValid = await adminModel.verifyRecoveryKey(username, recoveryKey);

    if (!recoveryKeyIsValid) {
      return res.status(404).json(adminToast.clientToast.error(2));
    }

    const newHashedPassword = await adminModel.encryptPassword(username, password);
    await adminModel.editAdminPassword(username, newHashedPassword);

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(adminToast.catchToast(error.message));
  }
};

module.exports = {
  adminLogin,
  newPassword,
};
