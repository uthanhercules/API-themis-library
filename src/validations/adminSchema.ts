const yup = require('./config');

const adminLoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const adminNewPasswordSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  recoveryKey: yup.string(0).required(),
});

module.exports = {
  adminLoginSchema,
  adminNewPasswordSchema,
};
