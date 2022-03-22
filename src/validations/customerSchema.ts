const yup = require('./config');

const deleteCustomerSchema = yup.object().shape({
  id: yup.string().required(),
});

export = {
  deleteCustomerSchema,
};
