const yup = require('./config');

const adminLoginSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});

const adminNewPasswordSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
  recoveryKey: yup.string().required(),
});

const adminNewUserSchema = yup.object().shape({
  adminId: yup.string().required(),
  login: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
});

export = {
  adminLoginSchema,
  adminNewPasswordSchema,
  adminNewUserSchema,
};
