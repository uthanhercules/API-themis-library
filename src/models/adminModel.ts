import knex from './connection';

const emailExists = async (email: string) => {
  const list = await knex('users_admin').select('email').where({ email });
  return list;
};

const loginExists = async (login: string) => {
  const list = await knex('users_admin').select('login').where({ login });
  return list;
};

const signUp = async (data: object) => {
  await knex('users_admin').insert(data);
};

const adminByLogin = async (login: string) => {
  const list = await knex('users_admin').select('id', 'password', 'recovery_key').where({ login });
  return list;
};

const adminById = async (id: string) => {
  const list = await knex('users_admin').select('id', 'password', 'recovery_key').where({ id });
  return list;
};

const changePassword = async (password: string, id: string) => {
  await knex('users_admin').update({ password }).where({ id });
};

const emailExistsById = async (id: string) => {
  const list = await knex('users_admin').select('email').where({ id });
  return list;
};

const changeAdminData = async (data: object, id: string) => {
  await knex('users_admin').update(data).where({ id });
};

export = {
  signUp,
  emailExists,
  loginExists,
  emailExistsById,
  adminByLogin,
  adminById,
  changePassword,
  changeAdminData,
};
