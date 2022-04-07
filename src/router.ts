import express from 'express';
import admin from './controllers/admin';
import procedure from './controllers/procedures';
import customer from './controllers/costumer';

import loginVerify from './middlewares/loginVerify';

const route = express();

route.post('/login', admin.loginController);
route.post('/admin/new-password', admin.newPasswordController);

route.use(loginVerify);
route.get('/admin/auth-verify', admin.authVerifyController);
route.get('/procedure/list-recent', procedure.listLastFiveProcedures);

route.post('/customer/create', customer.createCustomer);
route.patch('/customer/update', customer.updateCustomer);
route.delete('/customer/delete', customer.deleteCustomer);

export = route;
