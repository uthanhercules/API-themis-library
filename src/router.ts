const router = require('express');

const route = router();
const tokenVerification = require('./middlewares/tokenVerify');
const procedure = require('./controllers/procedures');
const admin = require('./controllers/admin');

route.post('/admin/login', admin.adminLogin);
route.post('/admin/new-password', admin.newPassword);

route.use(tokenVerification);
route.get('/procedure/list-recent', procedure.listLastFiveProcedures);

module.exports = route;
