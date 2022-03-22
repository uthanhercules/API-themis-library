import toast from '../messages/toasts';
import knex from '../models/connection';

const { deleteCustomerSchema } = require('../validations/customerSchema');

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

export = { deleteCustomer }
