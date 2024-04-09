"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentLink = void 0;
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const getPaymentLink = async (user) => {
    try {
        const data = {
            tx_ref: (0, uuid_1.v4)(),
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
        };
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        };
        const response = await axios_1.default.post("https://api.flutterwave.com/v3/payments", data, config);
        return response.data;
    }
    catch (err) {
        const error = err;
        throw new Error(error);
    }
};
exports.getPaymentLink = getPaymentLink;
//# sourceMappingURL=flutterwave.service.js.map