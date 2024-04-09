import { Request, Response } from "express";
import { getOneUserByEmail, create } from "../service/user.service";

// Controller function to add an email
export const register = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, state, age, gender, lga, term } = req.body;

  const userExist = await getOneUserByEmail(email);

  if (!userExist) {
    return res.status(409).json({
      message: `The user ${email.split("@")[0]} is already registered.`,
    });
  }

  try {
    const user = await create({
      name,
      email,
      phoneNumber,
      state,
      age,
      gender,
      lga,
      term,
    });

    // Return success response if email is added successfully
    return res
      .status(200)
      .json({ message: `${user.name} created Successfully` });
  } catch (error) {
    console.log(error); // Log any errors for debugging
    return res.status(500).json({ message: "Internal server error" }); // Return internal server error response
  }
};
