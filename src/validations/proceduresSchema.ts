const yup = require('./config');

const createProcedureSchema = yup.object().shape({
  customer_id: yup.string().required(),
  procedure_number: yup.string().required(),
  name: yup.string().required(),
  customer_name: yup.string().required(),
  description: yup.string().required(),
  files: yup.string().required(),
});

const createProcedureStepSchema = yup.object().shape({
  customer_id: yup.string().required(),
  procedure_number: yup.string().required(),
  name: yup.string().required(),
  customer_name: yup.string().required(),
  description: yup.string().required(),
  files: yup.string(),
  finished: yup.boolean().required(),
});

const deleteProcedureSchema = yup.object().shape({
  procedure_number: yup.string().required(),
});

const updateProcedureSchema = yup.object().shape({
  id: yup.string().required(),
  customer_id: yup.string().required(),
  procedure_number: yup.string().required(),
  name: yup.string().required(),
  customer_name: yup.string().required(),
  description: yup.string().required(),
  files: yup.string(),
  finished: yup.boolean().required(),
});

export = {
  createProcedureSchema,
  createProcedureStepSchema,
  deleteProcedureSchema,
  updateProcedureSchema,
};
