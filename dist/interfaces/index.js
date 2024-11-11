"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorReason = void 0;
var ErrorReason;
(function (ErrorReason) {
    ErrorReason[ErrorReason["NO_TOKEN"] = 0] = "NO_TOKEN";
    ErrorReason[ErrorReason["INVALID_TOKEN"] = 1] = "INVALID_TOKEN";
    ErrorReason[ErrorReason["USER_NOT_FOUND"] = 2] = "USER_NOT_FOUND";
})(ErrorReason || (exports.ErrorReason = ErrorReason = {}));
