import express from 'express';

require('dotenv').config();

const app = express();
const router = require('./router');

app.use(express.json());
app.use(router);

app.listen(8000);
