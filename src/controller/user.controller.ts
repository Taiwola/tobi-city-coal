import { Request, Response } from "express";
import { getOneUserByEmail, create } from "../service/user.service";
import { getPaymentLink } from "../service/payment.service";
import { confirm_registration } from "../lib/mailer";
import { writeToSheet } from "../lib/spreadsheet.config";





// Register a user
export const register = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, state, age, gender, lga, term } = req.body;

  // Check if the user exist
  const userExist = await getOneUserByEmail(email);

  // Return an error when user exist
  if (userExist) {
    return res.status(409).json({
      message: `The user ${email.split("@")[0]} is already registered.`,
    });
  }

  // Ready user for db saving
  const foundUser = {
    name,
    email: email.toLowerCase(),
    phoneNumber,
    state,
    age,
    gender,
    lga,
    term,
  };

  try {
    // Create user
    const user = await create(foundUser);

    // Initiate payment
    const payment = await getPaymentLink(user);

    // Create a google doc sheet for users that registered - sheet should be named registered.
    await writeToSheet([['Name', 'Email', 'Phone Number', 'State', 'Age', 'Gender', 'LGA', 'Term'],[name, email, phoneNumber, state, age, gender, lga, term]]);

    // DO IT HERE PLEASE!

    // Email Confirmation
    const { error, errorMessage } = await confirm_registration({ name, email });

    if (error) {
      console.log("error sending email");
      console.log(errorMessage);
      // Log to slack
    }

    // Return success response when user is created and payment link is generated
    return res.status(200).json({
      success: true,
      message: `${user.name} created Successfully`,
      data: payment.data,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
    return res.status(500).json({ message: "Internal server error" }); // Return internal server error response
  }
};
