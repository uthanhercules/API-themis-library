import proceduresModel from '../models/proceduresModel';
import toast from '../messages/toasts';

const listLastFiveProcedures = async (req: any, res: any) => {
  try {
    const procedures: any = await proceduresModel.listProcedures();
    return res.status(200).json(procedures.slice(0, 5));
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const listAllProcedures = async (req: any, res: any) => {
  try {
    const allProcedures = await proceduresModel.listProcedures();
    return res.status(200).json(allProcedures);
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  listLastFiveProcedures,
  listAllProcedures,
};
