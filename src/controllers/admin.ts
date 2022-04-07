import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import toast from '../messages/toasts';
import adminModel from '../models/adminModel';
import adminValidation from '../validations/adminSchema';

const jwtSecret: any = process.env.TOKEN_SECRET;

const loginController = async (req: any, res: any) => {
  const { login, password } = req.body;

  try {
    await adminValidation.login.validate(req.body);
    const adminList = await adminModel.adminsByLogin(login);
    const admin = adminList[0];

    if (!admin) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const passwordOk = await bcrypt.compare(password, admin.password);
    if (!passwordOk) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const signature = jwt.sign({
      id: admin.id,
    }, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({ id: admin.id, token: signature });
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newPasswordController = async (req: any, res: any) => {
  const { userId, password, recoveryKey } = req.body;

  try {
    await adminValidation.newPassword.validate(req.body);
    const adminList = await adminModel.adminsById(userId);
    const admin = adminList[0];

    if (!admin) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    if (admin.recovery_key !== recoveryKey) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await adminModel.changePassword(passwordHash, userId);

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const authVerifyController = (req: any, res: any) => res.status(200).json(true);

export = {
  loginController,
  newPasswordController,
  authVerifyController,
};
