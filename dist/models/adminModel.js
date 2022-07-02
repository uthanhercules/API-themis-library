"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connection_1 = __importDefault(require("./connection"));
const emailExists = async (email) => {
    const list = await (0, connection_1.default)('users_admin').select('email').where({ email });
    return list;
};
const loginExists = async (login) => {
    const list = await (0, connection_1.default)('users_admin').select('login').where({ login });
    return list;
};
const signUp = async (data) => {
    await (0, connection_1.default)('users_admin').insert(data);
};
const adminByLogin = async (login) => {
    const list = await (0, connection_1.default)('users_admin')
        .select('id', 'password', 'recovery_key')
        .where({ login });
    return list;
};
const adminById = async (id) => {
    const list = await (0, connection_1.default)('users_admin')
        .select('id', 'password', 'recovery_key')
        .where({ id });
    return list;
};
const changePassword = async (password, id) => {
    await (0, connection_1.default)('users_admin').update({ password }).where({ id });
};
const emailExistsById = async (id) => {
    const list = await (0, connection_1.default)('users_admin').select('email').where({ id });
    return list;
};
const changeAdminData = async (data, id) => {
    await (0, connection_1.default)('users_admin').update(data).where({ id });
};
module.exports = {
    signUp,
    emailExists,
    loginExists,
    emailExistsById,
    adminByLogin,
    adminById,
    changePassword,
    changeAdminData,
};
