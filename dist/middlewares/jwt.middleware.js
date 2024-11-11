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
exports.checkJWT = void 0;
const HandleJWT_1 = require("../utils/HandleJWT");
const checkJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerHeader = req.headers.authorization || '';
        const token = bearerHeader.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: 'No token provided' });
        // Verify token and get userId from it
        const decoded = (0, HandleJWT_1.verifyToken)(token, 'access');
        if (!decoded)
            return res.status(401).json({ message: 'Invalid token - Please login again' });
        req.userId = decoded.userId;
        next();
        //
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.checkJWT = checkJWT;
