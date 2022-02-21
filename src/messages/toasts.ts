/* eslint-disable no-console */
const succMessages = [
  'O controlador está funcionando!',
];

const attnMessages = [
  'O controlador está funcionando com erros!',
];

const errMessages = [
  'O Controlador não está funcionando!',
];

const consoleToast = {
  success: (code: number) => console.log(`\x1b[42m\x1b[30m SUCCESS \x1b[37m\x1b[0m ${succMessages[code]}`),
  attention: (code: number) => console.log(`\x1b[43m\x1b[30m WARNING \x1b[37m\x1b[0m ${attnMessages[code]}`),
  error: (code: number) => console.log(`\x1b[41m\x1b[30m PROBLEM \x1b[37m\x1b[0m ${errMessages[code]}`),
};

const clientToast = {
  success: (code: number) => succMessages[code],
  attention: (code: number) => attnMessages[code],
  error: (code: number) => errMessages[code],
};

const catchToast = (error: string) => `${error}`;

module.exports = { consoleToast, clientToast, catchToast };
