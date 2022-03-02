import knex from '../models/connection';
import toast from '../messages/toasts';

const listLastFiveProcedures = async (req: any, res: any) => {
  try {
    const lastProcedures = await knex('procedures').select('procedure_number', 'customer_id', 'name', 'updated').orderBy('updated', 'DESC');
    return res.status(200).json(lastProcedures.slice(0, 5));
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const listAllProcedures = async (req: any, res: any) => {
  try {
    const allProcedures = await knex('procedures').select('*').orderBy('updated', 'DESC');
    return res.status(200).json(allProcedures);
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  listLastFiveProcedures,
  listAllProcedures,
};
