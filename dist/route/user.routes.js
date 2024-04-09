"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const router = (0, express_1.Router)();
exports.userRouter = router;
const controller_1 = require("../controller");
router.post("/register", (0, schemaValidator_1.default)("/users/register"), controller_1.register);
//# sourceMappingURL=user.routes.js.map