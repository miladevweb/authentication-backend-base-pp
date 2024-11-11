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
exports.router = (0, express_1.Router)();
// api/refresh
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh } = req.body;
    if (!refresh)
        return res.status(400).json({ messagge: 'Invalid refresh token' });
    // Verify token
    const decoded = (0, HandleJWT_1.verifyToken)(refresh, 'refresh');
    if (!decoded)
        return res.status(401).json({ message: 'Invalid refresh token - Please login again' });
    try {
        const user = yield db_1.db.user.findFirst({ where: { id: decoded.userId }, select: { id: true } });
        if (!user)
            return res.status(401).json({ message: 'Invalid User' });
        // Generate new token
        const access = (0, HandleJWT_1.generateToken)(user.id, 'access');
        return res.status(200).json({ token: access });
        //
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
