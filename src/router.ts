const router = require('express');

const route = router();
const customer = require('./controllers/customer');
const procedure = require('./controllers/procedures');


route.get('/customer/new', customer.newCustomer);
route.get('/procedure/new', procedure.newProcedure);

module.exports = route;
