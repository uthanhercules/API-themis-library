import toast from '../messages/toasts';
import knex from '../models/connection';

const createCustomer = async (req: any, res: any) => {
    const { admin_id, full_name, email } = req.body;

    try {
        const newCustomer = await knex('customers').insert({
            id,
            admin_id,
            full_name,
            query_code,
            email,
        });

        return res.status(203).json('Cliente criado com sucesso!');
    } catch (error: any) {
        return res.status(400).json(toast.catchToast(error.message));
    }
};

export = { createCustomer }