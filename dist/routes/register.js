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
const HandleBcrypt_1 = require("../utils/HandleBcrypt");
const cloudinary_middleware_1 = require("../middlewares/cloudinary.middleware");
exports.router = (0, express_1.Router)();
// api/register
exports.router.post('/', cloudinary_middleware_1.upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const user = yield db_1.db.user.findFirst({ where: { email } });
        if (user)
            return res.status(400).json({ message: 'User already exists' });
        // Hash password
        const hashedPassword = yield (0, HandleBcrypt_1.encryptPassword)(password);
        // Create user
        yield db_1.db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: req.file ? req.file.path : null,
            },
        });
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
