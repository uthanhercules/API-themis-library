import knex from './connection';

const adminsByLogin = async (login: string) => {
  const list = await knex('users_admin').select('id', 'password').where({ login });
  return list;
};

const changePassword = async (password: string, login: string) => {
  await knex('users_admin').update({ password }).where({ login });
};

export = {
  adminsByLogin,
  changePassword,
};
