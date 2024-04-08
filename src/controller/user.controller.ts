import { Request, Response } from "express";



// Controller function to add an email
export const register = async (req: Request, res: Response) => {
    const { email } = req.body; // Destructuring email from request body

}