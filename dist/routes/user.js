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
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
exports.router = (0, express_1.Router)();
// api/user
exports.router.get('/', jwt_middleware_1.checkJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findFirst({ where: { id: req.userId } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        });
        //
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
