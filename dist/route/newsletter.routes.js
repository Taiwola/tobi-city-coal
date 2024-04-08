"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newletterRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.newletterRouter = router;
const controller_1 = require("../controller");
router.post("/sendFirstNewsletter", controller_1.sendFirstMail);
