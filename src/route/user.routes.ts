import { Router } from "express";

import schemaValidator from "../middleware/schemaValidator";

const router = Router();

import { register } from "../controller";

router.post("/register",  schemaValidator("/users/register"), register);

export { router as userRouter };
