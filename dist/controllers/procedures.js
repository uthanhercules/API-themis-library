"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable camelcase */
const crypto_1 = __importDefault(require("crypto"));
const proceduresModel_1 = __importDefault(require("../models/proceduresModel"));
const toasts_1 = __importDefault(require("../messages/toasts"));
const proceduresSchema_1 = __importDefault(require("../validations/proceduresSchema"));
const listLastFiveProcedures = async (req, res) => {
    try {
        const procedures = await proceduresModel_1.default.listProcedures();
        return res.status(200).json(procedures.slice(0, 5));
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const listProcedureByNumber = async (req, res) => {
    const { procedureNumber } = req.params;
    try {
        const procedures = await proceduresModel_1.default.listProcedureByNumber(procedureNumber);
        return res.status(200).json(procedures.slice(0, 5));
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const listAllProcedureByNumber = async (req, res) => {
    const { procedureNumber } = req.params;
    try {
        const procedures = await proceduresModel_1.default.listAllProcedureByNumber(procedureNumber);
        return res.status(200).json(procedures);
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const listAllProcedures = async (req, res) => {
    try {
        const allProcedures = await proceduresModel_1.default.listProcedures();
        return res.status(200).json(allProcedures);
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const createProcedure = async (req, res) => {
    const { customer_id, customer_name, procedure_number, name, description, files, } = req.body;
    try {
        await proceduresSchema_1.default.createProcedureSchema.validate(req.body);
        const proceduresByNumber = await proceduresModel_1.default.listProcedureByNumber(procedure_number);
        if (proceduresByNumber.length > 0) {
            return res.status(400).json('Este processo já está registrado');
        }
        const actualDate = new Date();
        const updated = actualDate.getTime();
        const id = crypto_1.default.randomUUID();
        const filesArray = files.split(', ');
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
        await proceduresModel_1.default.newProcedure(dataBlock);
        return res.status(200).json('Processo criado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const createProcedureStep = async (req, res) => {
    const { customer_id, customer_name, procedure_number, name, description, files, finished, } = req.body;
    try {
        await proceduresSchema_1.default.createProcedureStepSchema.validate(req.body);
        const proceduresByNumber = await proceduresModel_1.default.listProcedureByNumber(procedure_number);
        if (proceduresByNumber.length === 0) {
            return res.status(400).json('Este processo não está registrado');
        }
        if (proceduresByNumber[0].finished)
            return res.status(400).json('Este processo já está finalizado');
        const actualDate = new Date();
        const updated = actualDate.getTime();
        const id = crypto_1.default.randomUUID();
        const filesArray = files.split(', ');
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
        await proceduresModel_1.default.newProcedure(dataBlock);
        return res.status(200).json('Nova etapa do processo criada com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const deleteProcedure = async (req, res) => {
    const { procedure_number } = req.body;
    try {
        await proceduresSchema_1.default.deleteProcedureSchema.validate(req.body);
        const proceduresByNumber = await proceduresModel_1.default.listProcedureByNumber(procedure_number);
        if (proceduresByNumber.length === 0) {
            return res.status(400).json('Este processo não está registrado');
        }
        await proceduresModel_1.default.excludeProcedure(procedure_number);
        return res.status(203).json('Processo deletado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const updateProcedure = async (req, res) => {
    const { id, customer_id, customer_name, procedure_number, name, description, files, finished, } = req.body;
    try {
        await proceduresSchema_1.default.updateProcedureSchema.validate(req.body);
        const proceduresByNumber = await proceduresModel_1.default.listProcedureByNumber(procedure_number);
        if (proceduresByNumber.length === 0) {
            return res.status(400).json('Este processo não está registrado');
        }
        if (proceduresByNumber[0].finished)
            return res.status(400).json('Este processo já está finalizado');
        const actualDate = new Date();
        const updated = actualDate.getTime();
        const filesArray = files.split(', ');
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
        await proceduresModel_1.default.updateProcedure(dataBlock, id);
        return res.status(200).json('Processo editado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
module.exports = {
    listLastFiveProcedures,
    listAllProcedures,
    createProcedure,
    createProcedureStep,
    deleteProcedure,
    updateProcedure,
    listProcedureByNumber,
    listAllProcedureByNumber,
};
