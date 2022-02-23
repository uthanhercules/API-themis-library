const yup = require('./config');

const adminLoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const adminNewPasswordSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  recoveryKey: yup.string().required(),
});

const adminNewUserSchema = yup.object().shape({
  adminId: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.email().required(),
});

export = {
  adminLoginSchema,
  adminNewPasswordSchema,
  adminNewUserSchema,
};
