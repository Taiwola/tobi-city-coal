import "dotenv/config";

import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";

import { newletterRouter } from "./route/newsletter.routes";
import { userRouter } from "./route/user.routes";

try {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URL as string);
  console.log("Connected to db");
} catch (error) {
  console.log(error);
  throw new Error("Error Connecting To db");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

<<<<<<< HEAD
app.use("/api/newsletter", newletterRouter);
app.use("/api/users", userRouter);
=======

import { newletterRouter } from "./route/newsletter.routes";
import { paymentRouter } from "./route/payment.route";

app.use("/api/newsletter", newletterRouter);
app.use("/api/payment", paymentRouter);
>>>>>>> 2ff2b7c04a33d31ba9e84fa529d314eab14a33c8

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
