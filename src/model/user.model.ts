import mongoose from "mongoose";

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

const UserModel = mongoose.model<User>(
  "User",
  userSchema
);

export default UserModel;
