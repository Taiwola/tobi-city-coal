import {Router} from "express";

const router = Router();

import {payment, flwWebhook} from "../controller";

import verifyFlwSignature from "../middleware/verifyFlwSignature";

router.post("/", payment);
router.post("/webhooks", verifyFlwSignature, flwWebhook);


export {router as paymentRouter};