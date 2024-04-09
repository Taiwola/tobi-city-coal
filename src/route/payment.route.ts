import {Router} from "express";

const router = Router();

import {flwWebhook} from "../controller";

import verifyFlwSignature from "../middleware/verifyFlwSignature";


router.post("/webhooks", verifyFlwSignature, flwWebhook);


export {router as paymentRouter};