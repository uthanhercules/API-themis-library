const router = require('express');

const route = router();
const procedure = require('./controllers/procedures');

route.get('/procedure/list-recent', procedure.listLastFiveProcedures);

module.exports = route;
