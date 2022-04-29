import express from 'express';
import admin from './controllers/admin';
import procedure from './controllers/procedures';
import customer from './controllers/costumer';

import loginVerify from './middlewares/loginVerify';

const route = express();

route.post('/signup', admin.signUpAdmin);
route.post('/login', admin.loginController);
route.post('/new-password', admin.newPasswordController);

route.use(loginVerify);
route.get('/auth-verify', admin.authVerifyController);
route.put('/admin', admin.updateAdmin);
route.get('/procedure/list-recent', procedure.listLastFiveProcedures);

route.post('/customer/create', customer.createCustomer);
route.patch('/customer/update', customer.updateCustomer);
route.delete('/customer/delete', customer.deleteCustomer);

route.get('/procedure', procedure.listAllProcedures);
route.post('/procedure/create', procedure.createProcedure);
route.post('/procedure/create-step', procedure.createProcedureStep);
route.delete('/procedure/delete', procedure.deleteProcedure);
route.put('/procedure/update', procedure.updateProcedure);

export = route;
