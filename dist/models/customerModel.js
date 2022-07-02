"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connection_1 = __importDefault(require("../models/connection"));
const customerById = async (id) => {
    const customer = await (0, connection_1.default)('customers').select('id').where({ id });
    return customer;
};
const customerByIdFullData = async (id) => {
    const customer = await (0, connection_1.default)('customers').select('*').where({ id });
    return customer;
};
const customerByEmail = async (email) => {
    const customer = await (0, connection_1.default)('customers').select('id').where({ email });
    return customer;
};
const newCustomer = async (data) => {
    await (0, connection_1.default)('customers').insert(data);
};
const updateCustomerData = async (data, id) => {
    await (0, connection_1.default)('customers').update(data).where({ id });
};
const excludeCustomer = async (id) => {
    await (0, connection_1.default)('customers').delete().where({ id });
};
const listCustomers = async () => {
    const list = await (0, connection_1.default)('customers').select('id', 'full_name', 'email');
    return list;
};
module.exports = {
    customerById,
    customerByIdFullData,
    customerByEmail,
    newCustomer,
    updateCustomerData,
    excludeCustomer,
    listCustomers,
};
