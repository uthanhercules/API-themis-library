const errMessages = [
  'O Controlador não está funcionando!',
  'Nome de usuário ou senha inválidos.',
  'Nome de usuário ou código de recuperação inválidos!',
  'Você precisa estar logado para fazer isso.',
  'Este nome de usuário já está em uso',
  'Este email já está em uso',
];

const clientToast = {
  error: (code: number) => errMessages[code],
};

const catchToast = (error: string) => `${error}`;

export = { clientToast, catchToast };
