"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.paymentRouter = router;
const controller_1 = require("../controller");
const verifyFlwSignature_1 = __importDefault(require("../middleware/verifyFlwSignature"));
router.post("/", controller_1.payment);
router.post("/webhooks", verifyFlwSignature_1.default, controller_1.flwWebhook);
//# sourceMappingURL=payment.route.js.map