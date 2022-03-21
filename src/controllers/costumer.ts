import toast from '../messages/toasts';
import knex from '../models/connection';

const deleteCustomer = async (req: any, res: any) => {
    const { admin_id, full_name, email } = req.body;

    try {
        const deleteCustomer = await knex('customers').delete({
            id,
            admin_id,
            full_name,
            query_code,
            email,
        });

        return res.status(203).json('Cliente deletado com sucesso!');
    } catch (error: any) {
        return res.status(400).json(toast.catchToast(error.message));
    }
};

export = { deleteCustomer }