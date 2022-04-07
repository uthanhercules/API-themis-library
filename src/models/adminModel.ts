import knex from './connection';

const adminsByLogin = async (login: string) => {
  const list = await knex('users_admin').select('id', 'password', 'recovery_key').where({ login });
  return list;
};

const adminsById = async (id: string) => {
  const list = await knex('users_admin').select('id', 'password', 'recovery_key').where({ id });
  return list;
};

const changePassword = async (password: string, id: string) => {
  await knex('users_admin').update({ password }).where({ id });
};

export = {
  adminsByLogin,
  adminsById,
  changePassword,
};
