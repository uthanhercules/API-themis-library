import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const routes = require('./router');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8000);
