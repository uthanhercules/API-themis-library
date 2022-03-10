import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passGen from 'generate-password';
import knex from '../models/connection';
import toast from '../messages/toasts';

const { adminLoginSchema, adminNewPasswordSchema, adminNewUserSchema } = require('../validations/adminSchema');

const jwtSecret: any = process.env.TOKEN_SECRET;

const loginController = async (req: any, res: any) => {
  const { login, password } = req.body;
  let isAdmin = false;

  try {
    await adminLoginSchema.validate(req.body);
    const listOfAdminByUsername = await knex('users_admin').select('id', 'password').where({ login });
    const listOfUsersByUsername = await knex('users_common').select('id', 'password').where({ login });

    if (listOfAdminByUsername.length === 0 && listOfUsersByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    if (listOfAdminByUsername.length > 0) {
      isAdmin = true;
    }

    if (isAdmin) {
      const passwordOk = await bcrypt.compare(password, listOfAdminByUsername[0].password);
      if (!passwordOk) {
        return res.status(404).json(toast.clientToast.error(1));
      }

      const signature = jwt.sign({
        id: listOfAdminByUsername[0].id,
      }, jwtSecret, { expiresIn: '24h' });

      return res.status(200).json({ id: listOfAdminByUsername[0].id, token: signature });
    }

    const passwordOk = await bcrypt.compare(password, listOfUsersByUsername[0].password);
    if (!passwordOk) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const signature = jwt.sign({
      id: listOfUsersByUsername[0].id,
    }, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({ id: listOfUsersByUsername[0].id, token: signature });
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

// TODO - Users Recover Password
const newPasswordController = async (req: any, res:any) => {
  const { login, password, recoveryKey } = req.body;

  try {
    await adminNewPasswordSchema.validate(req.body);
    const listOfAdminByUsername = await knex('users_admin').select('id', 'password', 'recovery_key').where({ login });

    if (listOfAdminByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    if (listOfAdminByUsername[0].recovery_key !== recoveryKey) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    await knex('users_admin').update({ password: newHashedPassword }).where({ login });

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newUserController = async (req: any, res: any) => {
  const {
    adminId, login, email, password,
  } = req.body;

  try {
    await adminNewUserSchema.validate(req.body);

    const listOfAdminById = await knex('users_admin').select('id').where({ id: adminId });
    if (listOfAdminById.length === 0) {
      return res.status(404).json(toast.clientToast.error(3));
    }

    const listOfUsersByUsername = await knex('users_common').select('login').where({ login });
    const listOfUsersByEmail = await knex('users_common').select('login').where({ email });
    if (listOfUsersByUsername.length > 0) {
      return res.status(404).json(toast.clientToast.error(4));
    }

    if (listOfUsersByEmail.length > 0) {
      return res.status(404).json(toast.clientToast.error(5));
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    const id = await crypto.randomUUID();
    const recoveryKey = await passGen.generate({ length: 12, numbers: true });

    await knex('users_common').insert({
      id,
      admin_id: adminId,
      login,
      email,
      password: newHashedPassword,
      recovery_key: recoveryKey,
    });

    return res.status(203).json('Usuário criado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const authVerifyController = (req: any, res:any) => res.status(200).json(true);

export = {
  loginController,
  newPasswordController,
  newUserController,
  authVerifyController,
};
