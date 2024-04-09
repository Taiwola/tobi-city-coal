import { Request, Response } from "express";
import { getOneUserByEmail, create } from "../service/user.service";
import { getPaymentLink } from "../service/payment.service";

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

    // Create a google doc sheet for users that registered.

    // DO IT HERE PLEASE!

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
