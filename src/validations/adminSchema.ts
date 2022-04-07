const yup = require('./config');

const login = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});

const newPassword = yup.object().shape({
  userId: yup.string().required(),
  password: yup.string().required(),
  recoveryKey: yup.string().required(),
});

export = {
  login,
  newPassword,
};
