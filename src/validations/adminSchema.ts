const yup = require('./config');

const signUp = yup.object().shape({
  login: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const login = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});

const newPassword = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
  recoveryKey: yup.string().required(),
});

const updateAdmin = yup.object().shape({
  login: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export = {
  signUp,
  login,
  newPassword,
  updateAdmin,
};
