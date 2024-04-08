"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const newsletterSchema = new mongoose_1.default.Schema({
    user_email: { type: String, required: true },
    user_firstname: { type: String, required: true },
    user_lastname: { type: String, required: true },
    user_contact_number: { type: String, required: true }
});
const Newsletter = mongoose_1.default.model("newsletter", newsletterSchema);
exports.default = Newsletter;
