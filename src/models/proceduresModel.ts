import knex from "../models/connection";

interface IProcedure {
  procedure_number: string;
  customer_id: string;
  name: string;
  updated: string;
}

const listProcedures = async () => {
  const list = await knex("procedures")
    .select(
      "procedure_number",
      "customer_id",
      "customer_name",
      "name",
      "updated"
    )
    .orderBy("updated", "DESC");
  const uniqueList = list.filter((procedure: IProcedure, position: number) => {
    if (position === 0) return procedure;
    if (procedure.procedure_number === list[position - 1].procedure_number)
      return;
    return procedure;
  });

  return uniqueList;
};

const listProcedureByNumber = async (procedureNumber: number) => {
  const list = await knex("procedures")
    .select("*")
    .where({ procedure_number: procedureNumber })
    .orderBy("updated", "DESC");
  const uniqueList = list.filter((procedure: IProcedure, position: number) => {
    if (position === 0) return procedure;
    if (procedure.procedure_number === list[position - 1].procedure_number)
      return;
    return procedure;
  });

  return uniqueList;
};

const newProcedure = async (data: object) => {
  await knex("procedures").insert(data);
};

const excludeProcedure = async (procedureNumber: number) => {
  await knex("procedures")
    .delete()
    .where({ procedure_number: procedureNumber });
};

const updateProcedure = async (data: object, id: string) => {
  await knex("procedures").update(data).where({ id });
};

export = {
  listProcedures,
  listProcedureByNumber,
  newProcedure,
  excludeProcedure,
  updateProcedure,
};
