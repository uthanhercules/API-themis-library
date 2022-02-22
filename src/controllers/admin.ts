import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../models/connection';
import toast from '../messages/toasts';

const jwtSecret: any = process.env.TOKEN_SECRET;

const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const listOfAdminByUsername = await knex('users').select('id', 'password').where({ username });

    if (listOfAdminByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const passwordOk = await bcrypt.compare(password, listOfAdminByUsername[0].password);
    if (!passwordOk) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    const adminSignature = jwt.sign({
      id: listOfAdminByUsername[0].id,
    }, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({ token: adminSignature });
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const newPassword = async (req: any, res:any) => {
  const { username, password, recoveryKey } = req.body;
  try {
    const listOfAdminByUsername = await knex('users').select('id', 'password', 'recovery_key').where({ username });

    if (listOfAdminByUsername.length === 0) {
      return res.status(404).json(toast.clientToast.error(1));
    }

    if (listOfAdminByUsername[0].recovery_key !== recoveryKey) {
      return res.status(404).json(toast.clientToast.error(2));
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    await knex('users').update({ password: newHashedPassword }).where({ username });

    return res.status(203).json('Senha alterada com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  login,
  newPassword,
};
