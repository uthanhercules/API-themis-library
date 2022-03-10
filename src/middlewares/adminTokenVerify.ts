import jwt from 'jsonwebtoken';
import knex from '../models/connection';
import toast from '../messages/toasts';

const jwtSecret: any = process.env.TOKEN_SECRET;
// eslint-disable-next-line consistent-return
const adminTokenVerify = async (req: any, res: any, next: any) => {
  const userToken = req.header('userToken');

  try {
    const userData: any = jwt.verify(userToken, jwtSecret);
    const listOfUsersById = await knex('users_admin').select('id').where({ id: userData.id });

    if (listOfUsersById.length === 0) {
      return res.status(403).json(toast.clientToast.error(3));
    }

    next();
  } catch (error: any) {
    return res.status(400).json(toast.clientToast.error(3));
  }
};

export = adminTokenVerify;
