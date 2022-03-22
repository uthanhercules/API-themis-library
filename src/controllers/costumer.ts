/* eslint-disable camelcase */
import crypto from 'crypto';
import passGen from 'generate-password';
import toast from '../messages/toasts';
import knex from '../models/connection';

const { createCustomerSchema } = require('../validations/customerSchema');

const createCustomer = async (req: any, res: any) => {
  const { admin_id, full_name, email } = req.body;

  try {
    await createCustomerSchema.validate(req.body);

    const customerListByEmail = await knex('customers').select('id').where({ email });
    if (customerListByEmail.length > 0) {
      return res.status(400).json(toast.clientToast.error(5));
    }

    const userId = await crypto.randomUUID();
    const queryCode = await passGen.generate({
      length: 12, numbers: true, uppercase: false, lowercase: false, symbols: false,
    });

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
