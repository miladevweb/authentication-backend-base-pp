"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '';
const REFRESH_TOKEN_SECRET = (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : '';
const generateToken = (userId, type) => {
    switch (type) {
        case 'access':
            return (0, jsonwebtoken_1.sign)({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        case 'refresh':
            return (0, jsonwebtoken_1.sign)({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '2m' });
    }
};
exports.generateToken = generateToken;
const verifyToken = (token, type) => {
    try {
        switch (type) {
            case 'access':
                return (0, jsonwebtoken_1.verify)(token, ACCESS_TOKEN_SECRET);
            case 'refresh':
                return (0, jsonwebtoken_1.verify)(token, REFRESH_TOKEN_SECRET);
        }
    }
    catch (error) {
        console.log(error, 'VERIFY_ERROR');
        return null;
    }
};
exports.verifyToken = verifyToken;
