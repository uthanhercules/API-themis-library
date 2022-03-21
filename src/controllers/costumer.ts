/* eslint-disable camelcase */
import crypto from 'crypto';
import passGen from 'generate-password';
import toast from '../messages/toasts';
import knex from '../models/connection';

const { createCustomerSchema } = require('../validations/customerSchema');

const createCustomer = async (req: any, res: any) => {
  const { admin_id, full_name, email } = req.body;

  try {
    // Valida o Body de acordo com o Schema passado pelo YUP
    await createCustomerSchema.validate(req.body);

    // Lista clientes por email e logo verifica se há alguém na lista
    const customerListByEmail = await knex('customers').select('id').where({ email });
    if (customerListByEmail.length > 0) {
      return res.status(400).json(toast.clientToast.error(5));
    }

    const userId = await crypto.randomUUID(); // Gera ID para o user
    const queryCode = await passGen.generate({
      length: 12, numbers: true, uppercase: false, lowercase: false, symbols: false,
    }); // Gera senha aleatória

    await knex('customers').insert({
      id: userId,
      admin_id,
      full_name,
      query_code: queryCode,
      email,
    });

    return res.status(203).json('Cliente criado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = { createCustomer }
