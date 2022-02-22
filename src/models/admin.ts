const bcrypt = require('bcrypt');

const jwtSecret = process.env.TOKEN_SECRET;
const jwt = require('jsonwebtoken');
const adminDb = require('./connection');

const getAdminByUsername = async (username: string) => {
  const adminByUsername = await adminDb('users').select('id').where({ username });
  return adminByUsername;
};

const verifyRecoveryKey = async (username: string, key: string) => {
  const getKeyOfUser = await adminDb('users').select('recovery_key').where({ username });

  if (getKeyOfUser.length === 0 || getKeyOfUser[0].recovery_key !== key) {
    return false;
  }

  return true;
};

const verifyPassword = async (username: string, password: string) => {
  const getAdminData = await adminDb('users').select('id', 'username', 'password').where({ username });
  const pswOk = await bcrypt.compare(password, getAdminData[0].password);

  if (pswOk.length === 0) {
    return { ok: false };
  }

  return { id: getAdminData[0].id, ok: true };
};

const generateAdminToken = (id: string) => {
  const adminSignature = jwt.sign({
    id,
  }, jwtSecret, { expiresIn: '24h' });

  return { token: adminSignature };
};

const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

const editAdminPassword = async (username: string, password: string) => {
  await adminDb('users').update({ password }).where({ username });
};

const verifyUserByToken = async (token: string) => {
  const { id } = jwt.verify(token, jwtSecret);
  const userOfToken = await adminDb('users').select('id').where({ id });

  if (userOfToken.length === 0) {
    return false;
  }

  return true;
};

module.exports = {
  getAdminByUsername,
  verifyRecoveryKey,
  encryptPassword,
  verifyPassword,
  generateAdminToken,
  editAdminPassword,
  verifyUserByToken,
};
