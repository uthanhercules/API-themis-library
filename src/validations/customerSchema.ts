const yup = require('./config');

const createCustomerSchema = yup.object().shape({
  admin_id: yup.string().required(),
  full_name: yup.string().required(),
  email: yup.string().email().required(),
});

const deleteCustomerSchema = yup.object().shape({
  id: yup.string().required(),
});

export = {
  deleteCustomerSchema,
  createCustomerSchema,
};
