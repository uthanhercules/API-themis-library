import express from 'express';
import admin from './controllers/admin';
import procedure from './controllers/procedures';

import adminTokenVerify from './middlewares/adminTokenVerify';

const route = express();

route.post('/admin/login', admin.login);
route.post('/admin/new-password', admin.newPassword);

route.use(adminTokenVerify);
route.get('/admin/auth-verify', admin.authVerify);
route.get('/procedure/list-recent', procedure.listLastFiveProcedures);
route.post('/admin/new-user', admin.newUser);

export = route;
