import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import toast from '../messages/toasts';
import adminModel from '../models/adminModel';

const { adminLoginSchema } = require('../validations/adminSchema');

const jwtSecret: any = process.env.TOKEN_SECRET;

// eslint-disable-next-line no-unused-vars
const newLoginToken = {
  user: {
    id: 'string',
  },
  token: 'string',
};

const loginController = async (req: any, res: any) => {
  const { login, password } = req.body;

  try {
    await adminLoginSchema.validate(req.body);
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

// const newPasswordController = async (req: any, res:any) => {
//   const { login, password, recoveryKey } = req.body;

//   try {
//     await adminNewPasswordSchema.validate(req.body);
//     const listOfAdminByUsername =
// await knex('users_admin').select('id', 'password', 'recovery_key').where({ login });

//     if (listOfAdminByUsername.length === 0) {
//       return res.status(404).json(toast.clientToast.error(2));
//     }

//     if (listOfAdminByUsername[0].recovery_key !== recoveryKey) {
//       return res.status(404).json(toast.clientToast.error(2));
//     }

//     const newHashedPassword = await bcrypt.hash(password, 10);
//     await knex('users_admin').update({ password: newHashedPassword }).where({ login });

//     return res.status(203).json('Senha alterada com sucesso!');
//   } catch (error: any) {
//     return res.status(400).json(toast.catchToast(error.message));
//   }
// };

const authVerifyController = (req: any, res:any) => res.status(200).json(true);

export = {
  loginController,
  // newPasswordController,
  authVerifyController,
};
