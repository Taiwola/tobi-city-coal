import "dotenv/config";

import runScheduler from "./schedule";

import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";

import { userRouter } from "./route/user.routes";
import { paymentRouter } from "./route/payment.route";

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

app.use("/api/users", userRouter);
app.use("/api/payments", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

  // Schedule emails
  runScheduler();
});
