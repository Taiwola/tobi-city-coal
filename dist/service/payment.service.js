"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvents = exports.verifyTransaction = exports.getPaymentLink = exports.findOneByUser = exports.update = exports.create = void 0;
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const payment_model_1 = __importDefault(require("../model/payment.model"));
const mongoose_1 = require("mongoose");
const config = {
    headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
};
const create = async (payment) => {
    return await payment_model_1.default.create(payment);
};
exports.create = create;
const update = async (payment) => {
    await payment_model_1.default.updateOne({ id: payment.id }, { status: payment.status });
    return payment;
};
exports.update = update;
const findOneByUser = async (user) => {
    return await payment_model_1.default.findOne({ user: user.id }).populate("user");
};
exports.findOneByUser = findOneByUser;
const getPaymentLink = async (user) => {
    const reference = (0, uuid_1.v4)();
    try {
        const data = {
            tx_ref: reference,
            amount: "2000",
            currency: "NGN",
            redirect_url: "http://localhost:5173/",
            customer: {
                email: user.email,
                phonenumber: user.phoneNumber,
                name: user.name,
            },
            customizations: {
                title: "Coal City Marathon",
                logo: "https://res.cloudinary.com/dwl0pqzlx/image/upload/v1712586316/Frame_5_objfql.png",
            },
            meta: {
                consumer_id: user.id,
            },
        };
        const response = await axios_1.default.post("https://api.flutterwave.com/v3/payments", data, config);
        // Create Payment model after successful payment
        const payment = new payment_model_1.default({
            user: user.id,
            reference,
            status: "pending",
        });
        // Save payment object
        payment.save();
        // Return flutterwave response
        return response.data;
    }
    catch (err) {
        const error = err;
        throw new mongoose_1.Error(error);
    }
};
exports.getPaymentLink = getPaymentLink;
const verifyTransaction = async (id) => {
    try {
        const res = await axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${id}/verify`, config);
        return res.data;
    }
    catch (error) {
        const err = error;
        console.error(err.message);
        throw new mongoose_1.Error(err.message);
        // LOG TO SLACK
    }
};
exports.verifyTransaction = verifyTransaction;
const handleWebhookEvents = async (payload, payment) => {
    /**
     * Best Practices
     *
     * 1. Handle duplicates (if necessary)
     *
     * 2. Always re-query - https://api.flutterwave.com/v3/transactions/${reference}/verify
     *
     * 3. set up a background job that polls for the status of any pending transactions at regular intervals (for instance, every hour) - https://developer.flutterwave.com/docs/verifications/transaction/
     *
     */
    try {
        console.log("from flw", payload.txRef);
        console.log("from my db", payment.reference);
        if (payload.txRef !== payment.reference) {
            // LOG TO SLACK - something went wrong with the reference
            console.log("something went wrong with the reference");
            return;
        }
        // 1. Handle duplicates
        if (payment.status === "successful")
            return; // webhook is running multiple times
        // 2. verify payment by re-query
        const verify = await (0, exports.verifyTransaction)(payload.id);
        if (!verify?.data?.status)
            return; // Transaction not found
        // Transaction confirmed - give user benefits
        payment.status = verify.data.status;
        await (0, exports.update)(payment);
        // Send Email
        // - SEND EMAIL HERE?
    }
    catch (error) {
        console.log(error);
        // Log to slack - LOG ERROR TO SLACK
    }
};
exports.handleWebhookEvents = handleWebhookEvents;
//# sourceMappingURL=payment.service.js.map