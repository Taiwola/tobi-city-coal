import mongoose from "mongoose";

export type UserType = {
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  gender: string;
  state: string;
  lga: string;
  term: boolean;
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  term: { type: Boolean, required: true, default: false },
});

const User = mongoose.model<UserType>(
  "User",
  userSchema
);

export default User;
