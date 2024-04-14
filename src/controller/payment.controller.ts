import { Request, Response } from "express";
import { getOneUserByEmail } from "../service/user.service";
import { findOneByUser, handleWebhookEvents } from "../service/payment.service";
import { slackApp } from "../config/slack.config";

// Webhook Handler
export const flwWebhook = async (req: Request, res: Response) => {
  try {
    // Process the webhook payload
    const payload: IFlwData = req.body;

    // Acknowledge webhook from flutterwave - This is done because flw needs a response ASAP
    res.status(200).end();

    console.log("pay", payload);
    
    console.log("payload", payload.customer);

    // Continue operation
    // Get user email from the payload
    const email = payload.customer.email;

    // Find the user
    const user = await getOneUserByEmail(email);

    if (!user) {
      // User not found, something happened during registration - LOG INFO TO SLACK
      slackApp.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN as string,
        channel: process.env.SLACK_CHANNEL as string,
        text: "Web hook cant find registered user with email: " + email,
      });

      // End the process
      return;
    }

    // Find the user payment object
    const payment = await findOneByUser(user);

    if (!payment) {
      // Payment not found, something happened during registration - LOG INFO TO SLACK
      slackApp.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN as string,
        channel: process.env.SLACK_CHANNEL as string,
        text:
          "Web hook cant find registered user payment info for user with email: " +
          email,
      });

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
