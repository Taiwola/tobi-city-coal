// import { Request, Response } from "express";
// import { removeUserEmail, addUserEmail, getAllUserEmail, getOneUserEmail, getOneUserByEmail } from "../service";
// import { email1 } from "../lib/mailer";



// // Controller function to add an email
// export const addEmail = async (req: Request, res: Response) => {
//     const { email } = req.body; // Destructuring email from request body

//     const emailExist = await getOneUserByEmail(email);

//     if (emailExist) {
//         return res.status(409).json({ message: `The email ${email.split("@")[0]} is already registered.` });
//     }

//     try {
//         // addUserEmail is a function that adds the email to the system
//         // await addUserEmail(email);

//         // Return success response if email is added successfully
//         return res.status(200).json({ message: "email added" });
//     } catch (error) {
//         console.log(error); // Log any errors for debugging
//         return res.status(500).json({ message: "Internal server error" }); // Return internal server error response
//     }
// }

// // Controller function to send the first email
// export const sendFirstMail = async (req: Request, res: Response) => {
//     // Destructuring email and text from the request body
//     const { email, firstname, lastname, contact_number, category, customer_support_mail, registationId, username  } = req.body;

//     // Checking if the email already exists in the database
//     const emailExist = await getOneUserByEmail(email);

//     let newEmail;
//     // If email does not exist, add it to the database
//     if (!emailExist) {
//         newEmail = await addUserEmail(email, firstname, lastname, parseInt(contact_number));
//     }

//     // Selecting the email to use for sending based on existing or new email
//     const propsEmail = emailExist?.user_email || newEmail?.user_email;

//     try {
//         // Sending the email using the email1 function
//         const { error, errorMessage } = await email1({
//             email: propsEmail as string,
//             participant_fullname: firstname +' '+ lastname,
//             participant_contact: contact_number,
//             participant_name: firstname,
//             customer_support_mail: customer_support_mail,
//             category: category,
//             city_coal_name: username,
//             registrationId: registationId
//         });

//         // Handling any errors during email sending
//         if (error) {
//             console.log(errorMessage);
//             return res.status(400).json({ message: "Failed to send email" });
//         }

//         // Returning success message if email is sent successfully
//         return res.status(201).json({ message: "Mail sent" });
//     } catch (error) {
//         // Catching and logging any internal server errors
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

// export const get_all_email = async (req: Request, res: Response) => {
//     const  emails = await getAllUserEmail();
//     return res.status(200).json({
//         message: "Request successfull",
//         data: emails
//     });
// }

// export const get_one_email = async (req: Request, res: Response) => {
//     const {email} = req.params;

//     const user_email = await getOneUserByEmail(email);

//     if (!user_email) {
//         return res.status(404).
//         json({message:"This email does not exist in our database."});
//     } 

//     return res.status(200).json({message: "Request successfull", data: user_email});
// }

// export const remove_user_email = async (req: Request, res: Response) => {
//     const {Id} = req.params;

//     const remove = await removeUserEmail(Id);

//     return res.status(200).json()
// }