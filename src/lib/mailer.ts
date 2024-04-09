import {
  verifyTransporter,
  sendMail,
  transporter,
} from "../config/mailer.config";
import * as path from "path";
import ejs from "ejs";

interface EmailOptions {
  email: string;
  name: string;
}

export async function confirm_registration({
  name,
  email,
}: EmailOptions): Promise<{ error: boolean; errorMessage: string }> {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "registration_confirmation.ejs"
  );

  let verify: boolean;
  try {
    verify = await verifyTransporter();
  } catch (error: unknown) {
    console.log(error);
    return { error: true, errorMessage: (error as Error).message };
  }

  if (!verify) return { error: true, errorMessage: "" };

  let mailOptions;

  try {
    const template = await ejs.renderFile(templatePath, {
      participant_name: name,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: email,
      subject: "Registration Confirmation: Coal City Half Marathon",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}

export async function transactionVerified(
  reciever_name: string,
  reciever_email: string,
  payment_type: string,
  transaction_id: string
) {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "transaction_verify.ejs"
  );

  let verify: boolean;
  try {
    verify = await verifyTransporter();
  } catch (error: unknown) {
    console.log(error);
    return { error: true, errorMessage: (error as Error).message };
  }

  if (!verify) return { error: true, errorMessage: "" };

  let mailOptions;

  try {
    const template = await ejs.renderFile(templatePath, {
      name: reciever_name,
      payment_type: payment_type,
      transaction_id,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: reciever_email,
      subject: "Payment Confirmation for Coal-City Half Marathon",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}
