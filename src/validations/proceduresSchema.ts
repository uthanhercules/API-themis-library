const yup = require('./config');

const createProcedureSchema = yup.object().shape({
  customer_id: yup.string().required(),
  procedure_number: yup.number().required(),
  name: yup.string().required(),
  customer_name: yup.string().required(),
  description: yup.string().required(),
  files: yup.string().required(),
});

export = {
  createProcedureSchema,
}
