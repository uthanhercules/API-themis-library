import toast from '../messages/toasts';
import knex from '../models/connection';
import crypto from 'crypto';
import passGen from 'generate-password';

const { updateCustomerSchema } = require('../validations/adminSchema');

const updateCustomer = async (req: any, res: any) => {
    const { admin_id, full_name, email } = req.body;

    try {
        await updateCustomerSchema.validate(req.body)

        const customerListByEmail = await knex('customers').select('id').where({ email });
        if (customerListByEmail.length < 0) {
            return res.status(400).json(toast.clientToast.error(5));
        }

        await knex('customers').update({
            admin_id,
            full_name,
            email,
        }).where({ email });

        return res.status(203).json('Cliente atualizado com sucesso!');
    } catch (error: any) {
        return res.status(400).json(toast.catchToast(error.message));
    }
};

export = { updateCustomer }