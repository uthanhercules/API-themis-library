"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable camelcase */
const crypto_1 = __importDefault(require("crypto"));
const generate_password_1 = __importDefault(require("generate-password"));
const toasts_1 = __importDefault(require("../messages/toasts"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const { listCustomerByIdSchema, updateCustomerSchema, createCustomerSchema, deleteCustomerSchema, updateCustomerEmailSchema, updateCustomerFullNameSchema, } = require('../validations/customerSchema');
const updateCustomer = async (req, res) => {
    const { customer_id, full_name, email } = req.body;
    let dataBlock;
    try {
        const customerList = await customerModel_1.default.customerById(customer_id);
        const customer = customerList[0];
        if (!customer) {
            return res.status(404).json('Este cliente não existe.');
        }
        if (email && email.trim() !== '' && full_name && full_name.trim() !== '') {
            await updateCustomerSchema.validate(req.body);
            dataBlock = {
                full_name,
                email,
            };
        }
        else if (email && email.trim() !== '') {
            await updateCustomerEmailSchema.validate(req.body);
            dataBlock = {
                email,
            };
        }
        else if (full_name && full_name.trim() !== '') {
            await updateCustomerFullNameSchema.validate(req.body);
            dataBlock = {
                full_name,
            };
        }
        else {
            return res.status(400).json('Nenhum campo está preenchido');
        }
        await customerModel_1.default.updateCustomerData(dataBlock, customer_id);
        return res.status(203).json('Cliente atualizado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const createCustomer = async (req, res) => {
    const { full_name, email } = req.body;
    try {
        await createCustomerSchema.validate(req.body);
        const customerList = await customerModel_1.default.customerByEmail(email);
        const customer = customerList[0];
        if (customer) {
            return res.status(400).json(toasts_1.default.clientToast.error(5));
        }
        const userId = await crypto_1.default.randomUUID();
        const queryCode = await generate_password_1.default.generate({
            length: 12,
            numbers: true,
            uppercase: false,
            lowercase: false,
            symbols: false,
        });
        await customerModel_1.default.newCustomer({
            id: userId,
            full_name,
            query_code: queryCode,
            email,
        });
        return res.status(203).json('Cliente criado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const deleteCustomer = async (req, res) => {
    const { id } = req.body;
    try {
        await deleteCustomerSchema.validate(req.body);
        const customerList = await customerModel_1.default.customerById(id);
        const customer = customerList[0];
        if (!customer) {
            return res.status(400).json(toasts_1.default.clientToast.error(6));
        }
        await customerModel_1.default.excludeCustomer(id);
        return res.status(203).json('Cliente deletado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const listAllCustomers = async (req, res) => {
    try {
        const allCustumers = await customerModel_1.default.listCustomers();
        return res.status(200).json(allCustumers);
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const listCustomerById = async (req, res) => {
    try {
        await listCustomerByIdSchema.validate(req.params);
        const { id } = req.params;
        const customer = await customerModel_1.default.customerByIdFullData(id);
        return res.status(200).json(customer);
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
module.exports = {
    createCustomer,
    deleteCustomer,
    updateCustomer,
    listAllCustomers,
    listCustomerById,
};
