import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const routes = require('./router');

app.use(express.json());
app.use(routes);

app.listen(8000);
