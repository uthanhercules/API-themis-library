import jwt from 'jsonwebtoken';
import toast from '../messages/toasts';
import adminModel from '../models/adminModel';

const jwtSecret: any = process.env.TOKEN_SECRET;
// eslint-disable-next-line consistent-return
const adminTokenVerify = async (req: any, res: any, next: any) => {
  const userToken = req.header('userToken');

  try {
    const userData: any = jwt.verify(userToken, jwtSecret);
    const adminList = await adminModel.adminById(userData.id);
    const admin = adminList[0];

    if (!admin) {
      return res.status(403).json(toast.clientToast.error(3));
    }

    next();
  } catch (error: any) {
    return res.status(400).json(toast.clientToast.error(3));
  }
};

export = adminTokenVerify;
