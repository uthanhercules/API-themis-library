"use strict";
const yup = require('./config');
const updateCustomerEmailSchema = yup.object().shape({
    customer_id: yup.string().required(),
    email: yup.string().email().required(),
});
const updateCustomerFullNameSchema = yup.object().shape({
    customer_id: yup.string().required(),
    full_name: yup.string().required(),
});
const updateCustomerSchema = yup.object().shape({
    customer_id: yup.string().required(),
    email: yup.string().email().required(),
    full_name: yup.string().required(),
});
const createCustomerSchema = yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().email().required(),
});
const deleteCustomerSchema = yup.object().shape({
    id: yup.string().required(),
});
const listCustomerByIdSchema = yup.object().shape({
    id: yup.string().required(),
});
module.exports = {
    listCustomerByIdSchema,
    deleteCustomerSchema,
    createCustomerSchema,
    updateCustomerEmailSchema,
    updateCustomerFullNameSchema,
    updateCustomerSchema,
};
