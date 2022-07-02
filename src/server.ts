import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const cors = require('cors');
const routes = require('./router');
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT);
