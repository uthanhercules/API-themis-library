const router = require('express');

const route = router();
const customer = require('./controllers/customer');
const procedure = require('./controllers/procedures');
const admin = require('./controllers/admin');

route.get('/admin/test', admin.adminTest);
route.get('/customer/new', customer.newCustomer);
route.get('/procedure/new', procedure.newProcedure);

module.exports = route;
