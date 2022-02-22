const errMessages = [
  'O Controlador não está funcionando!',
  'Nome de usuário ou senha inválidos.',
  'Nome de usuário ou código de recuperação inválidos!',
  'Você precisa estar logado para fazer isso.',
];

const clientToast = {
  error: (code: number) => errMessages[code],
};

const catchToast = (error: string) => `${error}`;

export = { clientToast, catchToast };
