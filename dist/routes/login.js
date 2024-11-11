"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const db_1 = require("../db");
const express_1 = require("express");
const HandleJWT_1 = require("../utils/HandleJWT");
const HandleBcrypt_1 = require("../utils/HandleBcrypt");
exports.router = (0, express_1.Router)();
// api/login
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        // Find user
        const user = yield db_1.db.user.findFirst({ where: { email } });
        if (!user)
            return res.status(401).json({ message: 'Invalid email' });
        // Compare password
        const isValid = yield (0, HandleBcrypt_1.comparePassword)(password, user.password);
        if (!isValid)
            return res.status(401).json({ message: 'Invalid password' });
        // Generate token
        const userId = user.id;
        const access = (0, HandleJWT_1.generateToken)(userId, 'access');
        const refresh = (0, HandleJWT_1.generateToken)(userId, 'refresh');
        return res.status(200).json({ access, refresh });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
