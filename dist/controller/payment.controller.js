"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flwWebhook = exports.payment = void 0;
const got_1 = __importDefault(require("got"));
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield got_1.default.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            json: {
                tx_ref: "your_unique_transaction_reference",
                amount: req.body.amount,
                currency: req.body.currency || "NGN",
                redirect_url: req.body.redirect_url,
                meta: req.body.meta || {},
                customer: req.body.customer || {},
                customizations: req.body.customizations || {}
            }
        }).json();
        // Respond with the payment link
        res.json({
            status: "success",
            message: "Hosted Link",
            data: {
                link: response === null || response === void 0 ? void 0 : response.data.link
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while initializing payment" });
    }
});
exports.payment = payment;
const flwWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the signature to ensure the request is from Flutterwave
        const secretHash = process.env.FLW_SECRET_HASH;
        const signature = req.headers["verif-hash"];
        if (!signature || signature !== secretHash) {
            // The request is not from Flutterwave; discard
            return res.status(401).end();
        }
        // Process the webhook payload
        const payload = req.body;
        console.log(payload);
        // Handle duplicates (if necessary)
        // You can check the transaction status and update your records accordingly
        res.status(200).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
exports.flwWebhook = flwWebhook;
