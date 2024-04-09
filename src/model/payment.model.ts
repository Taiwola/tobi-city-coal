import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reference: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "successful", "failed"],
    default: "pending",
  },
});

const PaymentModel = mongoose.model<Payment>("Payment", paymentSchema);

export default PaymentModel;
