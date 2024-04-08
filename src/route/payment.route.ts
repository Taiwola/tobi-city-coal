import {Router} from "express";

const router = Router();

import {payment, flwWebhook} from "../controller"

router.post("/", payment);
router.post("/webhooks", flwWebhook);


export {router as paymentRouter};