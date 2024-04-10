import { v4 as uuidv4 } from "uuid";
import axios, { AxiosError } from "axios";
import PaymentModel from "../model/payment.model";
import { Error } from "mongoose";
import { transactionVerified } from "../lib/mailer";
import { writeToSheetForPaid } from "../lib/spreadsheet.config";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
  },
};

export const create = async (
  payment: Omit<Payment, "id">
): Promise<Payment> => {
  return await PaymentModel.create(payment);
};

export const update = async (payment: Payment): Promise<Payment> => {
  await PaymentModel.updateOne({ id: payment.id }, { status: payment.status });

  return payment;
};

export const findOneByUser = async (user: User): Promise<Payment | null> => {
  return await PaymentModel.findOne({ user: user.id }).populate("user");
};

export const getPaymentLink = async (user: User) => {
  const reference = uuidv4();

  try {
    const data = {
      tx_ref: reference,
      amount: "2000",
      currency: "NGN",
      redirect_url: "http://localhost:5173/#register",
      customer: {
        email: user.email,
        phonenumber: user.phoneNumber,
        name: user.name,
      },
      customizations: {
        title: "Coal City Marathon",
        logo: "https://res.cloudinary.com/dwl0pqzlx/image/upload/v1712586316/Frame_5_objfql.png",
      },
      meta: {
        consumer_id: user.id,
      },
    };

    const response = await axios.post<IFlutterWavePayment>(
      "https://api.flutterwave.com/v3/payments",
      data,
      config
    );

    // Create Payment model after successful payment
    const payment = new PaymentModel({
      user: user.id,
      reference,
      status: "pending",
    });

    // Save payment object
    payment.save();

    // Return flutterwave response
    return response.data;
  } catch (err) {
    const error = err as any;
    throw new Error(error);
  }
};

// Verify a flutterwave transaction
export const verifyTransaction = async (id: number) => {
  try {
    const res = await axios.get<IFlwVerification>(
      `https://api.flutterwave.com/v3/transactions/${id}/verify`,
      config
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<IFlwError>;
    console.error(err.message);
    throw new Error(err.message);

    // LOG TO SLACK
  }
};

// Handle fluttwrwave webhook
export const handleWebhookEvents = async (
  payload: IFlwData,
  payment: Payment
) => {
  /**
   * Best Practices
   *
   * 1. Handle duplicates (if necessary)
   *
   * 2. Always re-query - https://api.flutterwave.com/v3/transactions/${reference}/verify
   *
   * 3. set up a background job that polls for the status of any pending transactions at regular intervals (for instance, every hour) - https://developer.flutterwave.com/docs/verifications/transaction/
   *
   */
  try {
    // Verify refernce
    if (payload.txRef !== payment.reference) {
      // LOG TO SLACK - something went wrong with the reference
      console.log("something went wrong with the reference");
      return;
    }

    // 1. Handle duplicates
    if (payment.status === "successful") return; // webhook is running multiple times

    // 2. verify payment by re-query
    const verify = await verifyTransaction(payload.id);

    if (!verify?.data?.status) return; // Transaction not found

    // Transaction confirmed - give user benefits
    payment.status = verify.data.status;
    await update(payment);

    // Send Email to the user
    const { error, errorMessage } = await transactionVerified(
      payload.customer.fullName,
      verify.data.customer.email,
      verify.data.payment_type,
      verify.data.flw_ref
    );

    if (error) {
      console.log("Error sending Payment confirmation email");
      console.log(errorMessage);

      // LOG TO SLACK
      // return errorMessage;
    }

    // ADD TO GOOGLE DOCS - sheet should be named paid
    await writeToSheetForPaid(
      [
        ["name", "email", "payment_type", "flw_ref"],
        [
          payload.customer.fullName,
          verify.data.customer.email,
          verify.data.payment_type,
          verify.data.flw_ref,
        ],
      ],
      "paid"
    );
  } catch (error) {
    console.log(error);

    // Log to slack - LOG ERROR TO SLACK
  }
};
