"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const toasts_1 = __importDefault(require("../messages/toasts"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const jwtSecret = process.env.TOKEN_SECRET;
// eslint-disable-next-line consistent-return
const adminTokenVerify = async (req, res, next) => {
    const userToken = req.header('userToken');
    try {
        const userData = jsonwebtoken_1.default.verify(userToken, jwtSecret);
        const adminList = await adminModel_1.default.adminById(userData.id);
        const admin = adminList[0];
        if (!admin) {
            return res.status(403).json(toasts_1.default.clientToast.error(3));
        }
        next();
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.clientToast.error(3));
    }
};
module.exports = adminTokenVerify;
