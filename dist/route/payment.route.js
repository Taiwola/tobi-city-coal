"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.paymentRouter = router;
const controller_1 = require("../controller");
router.post("/", controller_1.payment);
router.post("/webhooks", controller_1.flwWebhook);
