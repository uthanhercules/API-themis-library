import knex from "../models/connection";

const customerById = async (id: string) => {
  const customer = await knex("customers").select("id").where({ id });
  return customer;
};

const customerByEmail = async (email: string) => {
  const customer = await knex("customers").select("id").where({ email });
  return customer;
};

const newCustomer = async (data: object) => {
  await knex("customers").insert(data);
};

const updateCustomerData = async (data: object, id: string) => {
  await knex("customers").update(data).where({ id });
};

const excludeCustomer = async (id: string) => {
  await knex("customers").delete().where({ id });
};

const listCustomers = async () => {
  const list = await knex("customers").select("id", "full_name", "email");
  return list;
};

export = {
  customerById,
  customerByEmail,
  newCustomer,
  updateCustomerData,
  excludeCustomer,
  listCustomers,
};
