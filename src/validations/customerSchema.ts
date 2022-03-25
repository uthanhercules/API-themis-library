const yup = require('./config');

const updateCustomerEmailSchema = yup.object().shape({
  customer_id: yup.string().required(),
  admin_id: yup.string().required(),
  email: yup.string().email().required(),
});

const updateCustomerFullNameSchema = yup.object().shape({
  customer_id: yup.string().required(),
  admin_id: yup.string().required(),
  full_name: yup.string().required(),
});

const updateCustomerSchema = yup.object().shape({
  customer_id: yup.string().required(),
  admin_id: yup.string().required(),
  email: yup.string().email().required(),
  full_name: yup.string().required(),
});

export = {
  updateCustomerEmailSchema,
  updateCustomerFullNameSchema,
  updateCustomerSchema,
}
