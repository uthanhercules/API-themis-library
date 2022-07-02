"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connection_1 = __importDefault(require("../models/connection"));
const listProcedures = async () => {
    const list = await (0, connection_1.default)('procedures')
        .select('procedure_number', 'customer_id', 'customer_name', 'name', 'updated')
        .orderBy('updated', 'DESC');
    const uniqueList = list.filter((procedure, position) => {
        if (position === 0)
            return procedure;
        if (procedure.procedure_number === list[position - 1].procedure_number) {
            return null;
        }
        return procedure;
    });
    return uniqueList;
};
const listProcedureByNumber = async (procedureNumber) => {
    const list = await (0, connection_1.default)('procedures')
        .select('*')
        .where({ procedure_number: procedureNumber })
        .orderBy('updated', 'DESC');
    const uniqueList = list.filter((procedure, position) => {
        if (position === 0)
            return procedure;
        if (procedure.procedure_number === list[position - 1].procedure_number) {
            return null;
        }
        return procedure;
    });
    return uniqueList;
};
const listAllProcedureByNumber = async (procedureNumber) => {
    const list = await (0, connection_1.default)('procedures')
        .select('*')
        .where({ procedure_number: procedureNumber })
        .orderBy('updated', 'DESC');
    return list;
};
const newProcedure = async (data) => {
    await (0, connection_1.default)('procedures').insert(data);
};
const excludeProcedure = async (procedureNumber) => {
    await (0, connection_1.default)('procedures')
        .delete()
        .where({ procedure_number: procedureNumber });
};
const updateProcedure = async (data, id) => {
    await (0, connection_1.default)('procedures').update(data).where({ id });
};
module.exports = {
    listProcedures,
    listProcedureByNumber,
    listAllProcedureByNumber,
    newProcedure,
    excludeProcedure,
    updateProcedure,
};
