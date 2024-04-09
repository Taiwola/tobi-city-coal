"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().required(),
    age: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    lga: joi_1.default.string().required(),
    term: joi_1.default.boolean().required(),
});
exports.default = {
    "/users/register": register,
};
//# sourceMappingURL=schemas.js.map