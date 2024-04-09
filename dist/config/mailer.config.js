"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.verifyTransporter = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const { createTransport } = nodemailer_1.default;
exports.transporter = createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});
const verifyTransporter = async () => await exports.transporter.verify();
exports.verifyTransporter = verifyTransporter;
const sendMail = async (mailOptions) => await exports.transporter.sendMail(mailOptions);
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.config.js.map