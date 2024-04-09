"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flwWebhook = void 0;
const user_service_1 = require("../service/user.service");
const payment_service_1 = require("../service/payment.service");
const flwWebhook = async (req, res) => {
    try {
        // Process the webhook payload
        const payload = req.body;
        // Send Flw back a response
        res.status(200).end();
        // Get user email from the payload
        const email = payload.customer.email;
        console.log("user email", email);
        // Find user
        const user = await (0, user_service_1.getOneUserByEmail)(email);
        console.log("user", user);
        // User not found, something happened during registration - LOG INFO TO SLACK
        if (!user)
            return;
        console.log("user found!");
        const payment = await (0, payment_service_1.findOneByUser)(user);
        // Payment not found, something happened during registration - LOG INFO TO SLACK
        if (!payment)
            return;
        console.log("payment found");
        // Handle flutterwave events
        await (0, payment_service_1.handleWebhookEvents)(payload, payment);
        console.log("yay! i am still running!");
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
};
exports.flwWebhook = flwWebhook;
//# sourceMappingURL=payment.controller.js.map