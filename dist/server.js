"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors = require('cors');
const routes = require('./router');
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express_1.default.json());
app.use(routes);
app.listen(PORT);
