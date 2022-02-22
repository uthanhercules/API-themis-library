const errMessages = [
  'O Controlador não está funcionando!',
  'Nome de usuário ou senha inválidos.',
  'Nome de usuário ou código de recuperação inválidos!',
];

const clientToast = {
  error: (code: number) => errMessages[code],
};

const catchToast = (error: string) => `${error}`;

module.exports = { clientToast, catchToast };
