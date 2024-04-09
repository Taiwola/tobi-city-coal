"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email1 = void 0;
const mailer_config_1 = require("../config/mailer.config");
const path = __importStar(require("path"));
const ejs_1 = __importDefault(require("ejs"));
async function email1({ email, participant_fullname, participant_contact, participant_name, customer_support_mail, city_coal_name, registrationId, category }) {
    const templatePath = path.join(__dirname, '..', '..', 'views', 'first_email.ejs');
    let verify;
    try {
        verify = await (0, mailer_config_1.verifyTransporter)();
    }
    catch (error) {
        console.log(error);
        return { error: true, errorMessage: error.message };
    }
    if (!verify)
        return { error: true, errorMessage: "" };
    let mailOptions;
    try {
        const template = await ejs_1.default.renderFile(templatePath, {
            email,
            participant_fullname,
            participant_contact,
            participant_name,
            customer_support_mail,
            city_coal_name,
            registrationId,
            category
        });
        mailOptions = {
            from: {
                name: "Newsletter",
                address: process.env.MAIL_USERNAME,
            },
            to: email,
            subject: "newsletter",
            html: template,
        };
        await (0, mailer_config_1.sendMail)(mailOptions);
        return { error: false, errorMessage: "" };
    }
    catch (error) {
        return { error: true, errorMessage: error.message };
    }
}
exports.email1 = email1;
//# sourceMappingURL=mailer.js.map