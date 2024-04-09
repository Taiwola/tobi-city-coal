import { Request, Response } from "express";
import { getOneUserByEmail } from "../service/user.service";
import { findOneByUser, handleWebhookEvents } from "../service/payment.service";

// Webhook Handler
export const flwWebhook = async (req: Request, res: Response) => {
  try {
    // Process the webhook payload
    const payload: IFlwData = req.body;

    // Send Flw back a response - This is done because flw needs a response ASAP
    res.status(200).end();
    
    // Continue option tho
    // Get user email from the payload
    const email = payload.customer.email;

    // Find the user
    const user = await getOneUserByEmail(email);

    if (!user) {
      // User not found, something happened during registration - LOG INFO TO SLACK

      // End the process
      return;
    }

    // Find the user payment object
    const payment = await findOneByUser(user);

    if (!payment) {
      // Payment not found, something happened during registration - LOG INFO TO SLACK

      // End the process
      return;
    }

    /**
     *  Handle flutterwave success event
     * Note: it sends @interface IFlwData when the "send webhook on error" field is not ticked on the flw dashboard. Else, it will send @interface IFlwWebhook interface
     */

    // Hand for IFlwData
    await handleWebhookEvents(payload, payment);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
