import toast from '../messages/toasts';
import knex from '../models/connection';

const updateCustomer = async (req: any, res: any) => {
    const { admin_id, full_name, email } = req.body;

    try {
        const objetoParaAtualizar = {
            email
        }
        await knex('customers').update(objetoParaAtualizar).where({ id });

        return res.status(203).json('Cliente atualizado com sucesso!');
    } catch (error: any) {
        return res.status(400).json(toast.catchToast(error.message));
    }
};

export = { updateCustomer }