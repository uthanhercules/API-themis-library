/* eslint-disable camelcase */
import crypto from "crypto";
import proceduresModel from "../models/proceduresModel";
import toast from "../messages/toasts";
import procedureValidation from "../validations/proceduresSchema";

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

const createProcedure = async (req: any, res: any) => {
  const {
    customer_id,
    customer_name,
    procedure_number,
    name,
    description,
    files,
  } = req.body;
  try {
    await procedureValidation.createProcedureSchema.validate(req.body);
    const proceduresByNumber: any = await proceduresModel.listProcedureByNumber(
      procedure_number
    );

    if (proceduresByNumber.length > 0) {
      return res.status(400).json("Este processo já está registrado");
    }

    const actualDate = new Date();
    const updated = actualDate.getTime();
    const id = crypto.randomUUID();
    const filesArray = files.split(", ");
    const filesFormated = JSON.stringify(filesArray);

    const dataBlock = {
      id,
      customer_id,
      customer_name,
      procedure_number: procedure_number.toString(),
      name,
      description,
      files: filesFormated,
      updated,
      finished: false,
    };

    await proceduresModel.newProcedure(dataBlock);

    return res.status(200).json("Processo criado com sucesso!");
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const createProcedureStep = async (req: any, res: any) => {
  const {
    customer_id,
    customer_name,
    procedure_number,
    name,
    description,
    files,
    finished,
  } = req.body;
  try {
    await procedureValidation.createProcedureStepSchema.validate(req.body);
    const proceduresByNumber: any = await proceduresModel.listProcedureByNumber(
      procedure_number
    );

    if (proceduresByNumber.length === 0) {
      return res.status(400).json("Este processo não está registrado");
    }

    if (proceduresByNumber[0].finished)
      return res.status(400).json("Este processo já está finalizado");

    const actualDate = new Date();
    const updated = actualDate.getTime();
    const id = crypto.randomUUID();
    const filesArray = files.split(", ");
    const filesFormated = JSON.stringify(filesArray);

    const dataBlock = {
      id,
      customer_id,
      customer_name,
      procedure_number: procedure_number.toString(),
      name,
      description,
      files: filesFormated,
      updated,
      finished,
    };

    await proceduresModel.newProcedure(dataBlock);

    return res.status(200).json("Nova etapa do processo criada com sucesso!");
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const deleteProcedure = async (req: any, res: any) => {
  const { procedure_number } = req.body;

  try {
    await procedureValidation.deleteProcedureSchema.validate(req.body);
    const proceduresByNumber: any = await proceduresModel.listProcedureByNumber(
      procedure_number
    );

    if (proceduresByNumber.length === 0) {
      return res.status(400).json("Este processo não está registrado");
    }

    await proceduresModel.excludeProcedure(procedure_number);

    return res.status(203).json("Processo deletado com sucesso!");
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

const updateProcedure = async (req: any, res: any) => {
  const {
    id,
    customer_id,
    customer_name,
    procedure_number,
    name,
    description,
    files,
    finished,
  } = req.body;

  try {
    await procedureValidation.updateProcedureSchema.validate(req.body);

    const proceduresByNumber: any = await proceduresModel.listProcedureByNumber(
      procedure_number
    );
    if (proceduresByNumber.length === 0) {
      return res.status(400).json("Este processo não está registrado");
    }

    if (proceduresByNumber[0].finished)
      return res.status(400).json("Este processo já está finalizado");

    const actualDate = new Date();
    const updated = actualDate.getTime();
    const filesArray = files.split(", ");
    const filesFormated = JSON.stringify(filesArray);

    const dataBlock = {
      id,
      customer_id,
      customer_name,
      procedure_number: procedure_number.toString(),
      name,
      description,
      files: filesFormated,
      updated,
      finished,
    };

    await proceduresModel.updateProcedure(dataBlock, id);

    return res.status(200).json("Processo editado com sucesso!");
  } catch (error: any) {
    return res.status(400).json(toast.catchToast(error.message));
  }
};

export = {
  listLastFiveProcedures,
  listAllProcedures,
  createProcedure,
  createProcedureStep,
  deleteProcedure,
  updateProcedure,
};
