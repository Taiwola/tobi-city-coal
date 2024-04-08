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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_user_email = exports.get_one_email = exports.get_all_email = exports.sendFirstMail = exports.addEmail = void 0;
const service_1 = require("../service");
const mailer_1 = require("../lib/mailer");
// Controller function to add an email
const addEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body; // Destructuring email from request body
    const emailExist = yield (0, service_1.getOneUserByEmail)(email);
    if (emailExist) {
        return res.status(409).json({ message: `The email ${email.split("@")[0]} is already registered.` });
    }
    try {
        // addUserEmail is a function that adds the email to the system
        // await addUserEmail(email);
        // Return success response if email is added successfully
        return res.status(200).json({ message: "email added" });
    }
    catch (error) {
        console.log(error); // Log any errors for debugging
        return res.status(500).json({ message: "Internal server error" }); // Return internal server error response
    }
});
exports.addEmail = addEmail;
// Controller function to send the first email
const sendFirstMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructuring email and text from the request body
    const { email, firstname, lastname, contact_number } = req.body;
    // Checking if the email already exists in the database
    const emailExist = yield (0, service_1.getOneUserByEmail)(email);
    let newEmail;
    // If email does not exist, add it to the database
    if (!emailExist) {
        newEmail = yield (0, service_1.addUserEmail)(email, firstname, lastname, parseInt(contact_number));
    }
    // Selecting the email to use for sending based on existing or new email
    const propsEmail = (emailExist === null || emailExist === void 0 ? void 0 : emailExist.user_email) || (newEmail === null || newEmail === void 0 ? void 0 : newEmail.user_email);
    try {
        // Sending the email using the email1 function
        const { error, errorMessage } = yield (0, mailer_1.email1)({
            email: propsEmail,
            text: "hello"
        });
        // Handling any errors during email sending
        if (error) {
            console.log(errorMessage);
            return res.status(400).json({ message: "Failed to send email" });
        }
        // Returning success message if email is sent successfully
        return res.status(201).json({ message: "Mail sent" });
    }
    catch (error) {
        // Catching and logging any internal server errors
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendFirstMail = sendFirstMail;
const get_all_email = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emails = yield (0, service_1.getAllUserEmail)();
    return res.status(200).json({
        message: "Request successfull",
        data: emails
    });
});
exports.get_all_email = get_all_email;
const get_one_email = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user_email = yield (0, service_1.getOneUserByEmail)(email);
    if (!user_email) {
        return res.status(404).
            json({ message: "This email does not exist in our database." });
    }
    return res.status(200).json({ message: "Request successfull", data: user_email });
});
exports.get_one_email = get_one_email;
const remove_user_email = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    const remove = yield (0, service_1.removeUserEmail)(Id);
    return res.status(200).json();
});
exports.remove_user_email = remove_user_email;
