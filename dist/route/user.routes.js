"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
const user_controller_1 = require("../controller/user.controller");
router.post("/register", user_controller_1.register);
