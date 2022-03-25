/* eslint-disable camelcase */
import crypto from 'crypto';
import passGen from 'generate-password';
import toast from '../messages/toasts';
import knex from '../models/connection';

const { updateCustomerEmailSchema, updateCustomerFullNameSchema, updateCustomerSchema, createCustomerSchema, deleteCustomerSchema } = require('../validations/customerSchema');

const updateCustomer = async (req: any, res: any) => {
  const {
    customer_id, admin_id, full_name, email,
  } = req.body;

  let dataBlock: object;

  try {
    const customerListById = await knex('customers').select('id').where({ id: customer_id, admin_id });
    if (customerListById.length === 0) {
      return res.status(404).json('Este cliente não existe.');
    }

    if (email && email.trim() !== '' && full_name && full_name.trim() !== '') {
      await updateCustomerSchema.validate(req.body);

      dataBlock = {
        full_name,
        email,
      };
    } else if (email && email.trim() !== '') {
      await updateCustomerEmailSchema.validate(req.body);

      dataBlock = {
        email,
      };
    } else if (full_name && full_name.trim() !== '') {
      await updateCustomerFullNameSchema.validate(req.body);

      dataBlock = {
        full_name,
      };
    } else {
      return res.status(400).json('Nenhum campo está preenchido');
    }

    await knex('customers').update(dataBlock).where({ id: customer_id });
    return res.status(203).json('Cliente atualizado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

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

const deleteCustomer = async (req: any, res: any) => {
  const { id } = req.body;

  try {
    await deleteCustomerSchema.validate(req.body);
    const customerListById = await knex('customers').select('id').where({ id });
    if (customerListById.length === 0) {
      return res.status(400).json(toast.clientToast.error(6));
    }

    await knex('customers').delete().where({ id });

    return res.status(203).json('Cliente deletado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = { createCustomer, deleteCustomer, updateCustomer };
