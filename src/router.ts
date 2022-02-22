const router = require('express');

const route = router();
const procedure = require('./controllers/procedures');
const admin = require('./controllers/admin');

route.get('/procedure/list-recent', procedure.listLastFiveProcedures);
route.post('/admin/login', admin.adminLogin);
route.post('/admin/new-password', admin.newPassword);

module.exports = route;
