import express from 'express';
import admin from './controllers/admin';
import procedure from './controllers/procedures';
import customer from './controllers/costumer';

import loginVerify from './middlewares/loginVerify';

const route = express();

route.post('/login', admin.loginController);
route.post('/new-password', admin.newPasswordController);

route.use(loginVerify);
route.get('/auth-verify', admin.authVerifyController);
route.get('/admin/:id', admin.listAdminById);
route.put('/admin/update', admin.updateAdmin);
route.post('/signup', admin.signUpAdmin);

route.get('/customer', customer.listAllCustomers);
route.get('/customer/:id', customer.listCustomerById);
route.post('/customer/create', customer.createCustomer);
route.patch('/customer/update', customer.updateCustomer);
route.delete('/customer/delete', customer.deleteCustomer);

route.get('/procedure/list-recent', procedure.listLastFiveProcedures);
route.get('/procedure', procedure.listAllProcedures);
route.get('/procedure/:procedureNumber', procedure.listProcedureByNumber);
route.get(
  '/procedure/all/:procedureNumber',
  procedure.listAllProcedureByNumber
);
route.post('/procedure/create', procedure.createProcedure);
route.post('/procedure/create-step', procedure.createProcedureStep);
route.delete('/procedure/delete', procedure.deleteProcedure);
route.put('/procedure/update', procedure.updateProcedure);

export = route;
