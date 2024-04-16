import { verifyTransporter, sendMail } from "../config/mailer.config";
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

  console.log("From verifyTransaction: ", reciever_email, reciever_name, payment_type, transaction_id)
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

export async function two_weeks_reminder({ email, name }: EmailOptions) {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "two_weeks.ejs"
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
      name: name,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: email,
      subject: "REMINDER TWO WEEKS BEFORE THE MARATHON",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}

export async function one_weeks_reminder({ email, name }: EmailOptions) {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "one_week.ejs"
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
      name: name,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: email,
      subject: " REMINDER ONE WEEK BEFORE THE MARATHON",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}

export async function three_days_reminder({ email, name }: EmailOptions) {
  const templatePath = path.join(__dirname, "..", "..", "views", "3_days.ejs");

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
      name: name,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: email,
      subject: "REMINDER THREE DAYS BEFORE THE MARATHON",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}

export async function day_of_event_reminder({ email, name }: EmailOptions) {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "final_day.ejs"
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
      name: name,
    });

    mailOptions = {
      from: {
        name: "Coal City Half Marathon",
        address: process.env.MAIL_USERNAME as string,
      },
      to: email,
      subject: "REMINDER ON THE DAY OF THE MARATHON",
      html: template,
    };
    await sendMail(mailOptions);
    return { error: false, errorMessage: "" };
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message };
  }
}
