import bcrypt from 'bcrypt';
import passGen from 'generate-password';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import toast from '../messages/toasts';
import adminModel from '../models/adminModel';
import adminValidation from '../validations/adminSchema';

const jwtSecret: any = process.env.TOKEN_SECRET;

const signUpAdmin = async (req: any, res: any) => {
  const { login, email, password } = req.body;

  try {
    await adminValidation.signUp.validate(req.body);
    const emailExists = await adminModel.emailExists(email);
    console.log(emailExists);
    if (emailExists.length > 0) {
      return res.status(400).json('Este email já está em uso');
    }

    const loginExists = await adminModel.loginExists(login);
    if (loginExists.length > 0) {
      return res.status(400).json('Este login já está em uso');
    }

    const id = crypto.randomUUID();
    const hash = await bcrypt.hash(password, 10);
    const recovery_key = await passGen.generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
    });

    const dataBlock = {
      id,
      login,
      email,
      password: hash,
      recovery_key,
    };

    await adminModel.signUp(dataBlock);

    return res.status(203).json('Administrador criado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const loginController = async (req: any, res: any) => {
  const { login, password } = req.body;

  try {
    await adminValidation.login.validate(req.body);
    const adminList = await adminModel.adminByLogin(login);
    const admin = adminList[0];

    if (!admin) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const passwordOk = await bcrypt.compare(password, admin.password);
    if (!passwordOk) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const signature = jwt.sign(
      {
        id: admin.id,
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    return res.status(200).json({ id: admin.id, token: signature });
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newPasswordController = async (req: any, res: any) => {
  const { login, password, recoveryKey } = req.body;

  try {
    await adminValidation.newPassword.validate(req.body);
    const adminList = await adminModel.adminByLogin(login);
    const admin = adminList[0];

    if (!admin) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    if (admin.recovery_key !== recoveryKey) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await adminModel.changePassword(passwordHash, admin.id);

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const authVerifyController = (req: any, res: any) => res.status(200).json(true);

const updateAdmin = async (req: any, res: any) => {
  const { id, login, password, email } = req.body;

  try {
    await adminValidation.updateAdmin.validate(req.body);

    const adminExists: any = await adminModel.emailExistsById(id);
    if (adminExists.length === 0) {
      return res.status(400).json('Este administrador não existe');
    }

    if (adminExists[0].email !== email) {
      const emailExists: any = await adminModel.emailExists(email);
      if (emailExists.length > 0) {
        return res.status(400).json('Este email já está sendo usado');
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const dataBlock = {
      login,
      password: hash,
      email,
    };

    await adminModel.changeAdminData(dataBlock, id);

    return res.status(200).json('Adinistrador atualizado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  signUpAdmin,
  loginController,
  newPasswordController,
  authVerifyController,
  updateAdmin,
};
