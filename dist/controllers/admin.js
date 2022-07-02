"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_password_1 = __importDefault(require("generate-password"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const toasts_1 = __importDefault(require("../messages/toasts"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminSchema_1 = __importDefault(require("../validations/adminSchema"));
const jwtSecret = process.env.TOKEN_SECRET;
const signUpAdmin = async (req, res) => {
    const { login, email, password } = req.body;
    try {
        await adminSchema_1.default.signUp.validate(req.body);
        const emailExists = await adminModel_1.default.emailExists(email);
        console.log(emailExists);
        if (emailExists.length > 0) {
            return res.status(400).json('Este email já está em uso');
        }
        const loginExists = await adminModel_1.default.loginExists(login);
        if (loginExists.length > 0) {
            return res.status(400).json('Este login já está em uso');
        }
        const id = crypto_1.default.randomUUID();
        const hash = await bcrypt_1.default.hash(password, 10);
        const recovery_key = await generate_password_1.default.generate({
            length: 12,
            numbers: true,
            uppercase: true,
            lowercase: true,
            symbols: false,
        });
        const dataBlock = {
            id,
            login,
            email,
            password: hash,
            recovery_key,
        };
        await adminModel_1.default.signUp(dataBlock);
        return res.status(203).json('Administrador criado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const loginController = async (req, res) => {
    const { login, password } = req.body;
    try {
        await adminSchema_1.default.login.validate(req.body);
        const adminList = await adminModel_1.default.adminByLogin(login);
        const admin = adminList[0];
        if (!admin) {
            return res.status(404).json(toasts_1.default.clientToast.error(1));
        }
        const passwordOk = await bcrypt_1.default.compare(password, admin.password);
        if (!passwordOk) {
            return res.status(404).json(toasts_1.default.clientToast.error(1));
        }
        const signature = jsonwebtoken_1.default.sign({
            id: admin.id,
        }, jwtSecret, { expiresIn: '24h' });
        return res.status(200).json({ id: admin.id, token: signature });
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const newPasswordController = async (req, res) => {
    const { login, password, recoveryKey } = req.body;
    try {
        await adminSchema_1.default.newPassword.validate(req.body);
        const adminList = await adminModel_1.default.adminByLogin(login);
        const admin = adminList[0];
        if (!admin) {
            return res.status(404).json(toasts_1.default.clientToast.error(2));
        }
        if (admin.recovery_key !== recoveryKey) {
            return res.status(404).json(toasts_1.default.clientToast.error(2));
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        await adminModel_1.default.changePassword(passwordHash, admin.id);
        return res.status(203).json('Senha alterada com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
const authVerifyController = (req, res) => res.status(200).json(true);
const updateAdmin = async (req, res) => {
    const { id, login, password, email } = req.body;
    try {
        await adminSchema_1.default.updateAdmin.validate(req.body);
        const adminExists = await adminModel_1.default.emailExistsById(id);
        if (adminExists.length === 0) {
            return res.status(400).json('Este administrador não existe');
        }
        if (adminExists[0].email !== email) {
            const emailExists = await adminModel_1.default.emailExists(email);
            if (emailExists.length > 0) {
                return res.status(400).json('Este email já está sendo usado');
            }
        }
        const hash = await bcrypt_1.default.hash(password, 10);
        const dataBlock = {
            login,
            password: hash,
            email,
        };
        await adminModel_1.default.changeAdminData(dataBlock, id);
        return res.status(200).json('Adinistrador atualizado com sucesso!');
    }
    catch (error) {
        return res.status(400).json(toasts_1.default.catchToast(error.message));
    }
};
module.exports = {
    signUpAdmin,
    loginController,
    newPasswordController,
    authVerifyController,
    updateAdmin,
};
