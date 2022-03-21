import express from 'express';
import admin from './controllers/admin';
import procedure from './controllers/procedures';
import customer from './controllers/costumer';

import adminTokenVerify from './middlewares/adminTokenVerify';

const route = express();

route.post('/admin/login', admin.loginController);
route.post('/admin/new-password', admin.newPasswordController);

route.use(adminTokenVerify);
route.get('/admin/auth-verify', admin.authVerifyController);
route.get('/procedure/list-recent', procedure.listLastFiveProcedures);
route.post('/admin/new-user', admin.newUserController);

route.delete('/customer/delete-customer', customer.deleteCustomer)

export = route;
