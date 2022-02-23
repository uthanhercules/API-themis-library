import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passGen from 'generate-password';
import knex from '../models/connection';
import toast from '../messages/toasts';

const { adminLoginSchema, adminNewPasswordSchema, adminNewUserSchema } = require('../validations/adminSchema');

const jwtSecret: any = process.env.TOKEN_SECRET;

const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    await adminLoginSchema.validate(req.body);
    const listOfAdminByUsername = await knex('admin').select('id', 'password').where({ username });

    if (listOfAdminByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const passwordOk = await bcrypt.compare(password, listOfAdminByUsername[0].password);
    if (!passwordOk) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const adminSignature = jwt.sign({
      id: listOfAdminByUsername[0].id,
      isAdmin: true,
    }, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({ id: listOfAdminByUsername[0].id, token: adminSignature });
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newPassword = async (req: any, res:any) => {
  const { username, password, recoveryKey } = req.body;
  try {
    await adminNewPasswordSchema.validate(req.body);
    const listOfAdminByUsername = await knex('admin').select('id', 'password', 'recovery_key').where({ username });

    if (listOfAdminByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    if (listOfAdminByUsername[0].recovery_key !== recoveryKey) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    await knex('admin').update({ password: newHashedPassword }).where({ username });

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newUser = async (req: any, res: any) => {
  const {
    adminId, username, email, password,
  } = req.body;

  try {
    await adminNewUserSchema.validate(req.body);

    const listOfAdminById = await knex('admin').select('id').where({ id: adminId });
    if (listOfAdminById.length === 0) {
      return res.status(404).json(toast.clientToast.error(3));
    }

    const listOfUsersByUsername = await knex('users').select('username').where({ username });
    const listOfUsersByEmail = await knex('users').select('username').where({ email });
    if (listOfUsersByUsername.length > 0) {
      return res.status(404).json(toast.clientToast.error(4));
    }

    if (listOfUsersByEmail.length > 0) {
      return res.status(404).json(toast.clientToast.error(5));
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    const id = await crypto.randomUUID();
    const recoveryKey = await passGen.generate({ length: 12, numbers: true });

    await knex('users').insert({
      id,
      admin_id: adminId,
      username,
      email,
      password: newHashedPassword,
      recovery_key: recoveryKey,
    });

    return res.status(203).json('Usuário criado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  login,
  newPassword,
  newUser,
};
