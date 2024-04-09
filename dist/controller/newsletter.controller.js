"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_user_email = exports.get_one_email = exports.get_all_email = exports.sendFirstMail = exports.addEmail = void 0;
const service_1 = require("../service");
const mailer_1 = require("../lib/mailer");
// Controller function to add an email
const addEmail = async (req, res) => {
    const { email } = req.body; // Destructuring email from request body
    const emailExist = await (0, service_1.getOneUserByEmail)(email);
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
};
exports.addEmail = addEmail;
// Controller function to send the first email
const sendFirstMail = async (req, res) => {
    // Destructuring email and text from the request body
    const { email, firstname, lastname, contact_number, category, customer_support_mail, registationId, username } = req.body;
    // Checking if the email already exists in the database
    const emailExist = await (0, service_1.getOneUserByEmail)(email);
    let newEmail;
    // If email does not exist, add it to the database
    if (!emailExist) {
        newEmail = await (0, service_1.addUserEmail)(email, firstname, lastname, parseInt(contact_number));
    }
    // Selecting the email to use for sending based on existing or new email
    const propsEmail = emailExist?.user_email || newEmail?.user_email;
    try {
        // Sending the email using the email1 function
        const { error, errorMessage } = await (0, mailer_1.email1)({
            email: propsEmail,
            participant_fullname: firstname + ' ' + lastname,
            participant_contact: contact_number,
            participant_name: firstname,
            customer_support_mail: customer_support_mail,
            category: category,
            city_coal_name: username,
            registrationId: registationId
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
};
exports.sendFirstMail = sendFirstMail;
const get_all_email = async (req, res) => {
    const emails = await (0, service_1.getAllUserEmail)();
    return res.status(200).json({
        message: "Request successfull",
        data: emails
    });
};
exports.get_all_email = get_all_email;
const get_one_email = async (req, res) => {
    const { email } = req.params;
    const user_email = await (0, service_1.getOneUserByEmail)(email);
    if (!user_email) {
        return res.status(404).
            json({ message: "This email does not exist in our database." });
    }
    return res.status(200).json({ message: "Request successfull", data: user_email });
};
exports.get_one_email = get_one_email;
const remove_user_email = async (req, res) => {
    const { Id } = req.params;
    const remove = await (0, service_1.removeUserEmail)(Id);
    return res.status(200).json();
};
exports.remove_user_email = remove_user_email;
//# sourceMappingURL=newsletter.controller.js.map