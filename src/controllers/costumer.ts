/* eslint-disable camelcase */
import crypto from 'crypto';
import passGen from 'generate-password';
import toast from '../messages/toasts';
import customerModel from '../models/customerModel';

const {
  updateCustomerSchema,
  createCustomerSchema,
  deleteCustomerSchema,
  updateCustomerEmailSchema,
  updateCustomerFullNameSchema,
} = require('../validations/customerSchema');

const updateCustomer = async (req: any, res: any) => {
  const {
    customer_id, full_name, email,
  } = req.body;

  let dataBlock: object;

  try {
    const customerList = await customerModel.customerById(customer_id);
    const customer = customerList[0];

    if (!customer) {
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

    await customerModel.updateCustomerData(dataBlock, customer_id);
    return res.status(203).json('Cliente atualizado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const createCustomer = async (req: any, res: any) => {
  const { full_name, email } = req.body;

  try {
    await createCustomerSchema.validate(req.body);

    const customerList = await customerModel.customerByEmail(email);
    const customer = customerList[0];

    if (customer) {
      return res.status(400).json(toast.clientToast.error(5));
    }

    const userId = await crypto.randomUUID();
    const queryCode = await passGen.generate({
      length: 12, numbers: true, uppercase: false, lowercase: false, symbols: false,
    });

    await customerModel.newCustomer({
      id: userId,
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
    const customerList = await customerModel.customerById(id);
    const customer = customerList[0];

    if (!customer) {
      return res.status(400).json(toast.clientToast.error(6));
    }

    await customerModel.excludeCustomer(id);

    return res.status(203).json('Cliente deletado com sucesso!');
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = { createCustomer, deleteCustomer, updateCustomer };
