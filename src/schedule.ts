import schedule from "node-schedule";

import { findAll } from "./service/payment.service";
import {
  day_of_event_reminder,
  one_weeks_reminder,
  three_days_reminder,
  two_weeks_reminder,
} from "./lib/mailer";

const runScheduler = () => {
  console.log("Waiting to run scheduled jobs");

  const date = new Date(2024, 3, 10, 2, 25, 0);

  schedule.scheduleJob("Poll Flutterwave", "*", async () => {
   
  })

  schedule.scheduleJob("Two weeks to marathon", date, async () => {
    const payments = await findAll();

    const promises = await Promise.all(
      payments
        .filter((item) => item.status === "successful")
        .map(async (payment) => {
          const data = {
            email: payment.user.email,
            name: payment.user.name,
          };

          const { error, errorMessage } = await two_weeks_reminder(data);

          if (error) {
            console.log("Error sending Payment confirmation email");
            console.log(errorMessage);

            // LOG TO SLACK
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  schedule.scheduleJob("One week to marathon", date, async () => {
    const payments = await findAll();

    const promises = await Promise.all(
      payments
        .filter((item) => item.status === "successful")
        .map(async (payment) => {
          const data = {
            email: payment.user.email,
            name: payment.user.name,
          };

          const { error, errorMessage } = await one_weeks_reminder(data);

          if (error) {
            console.log("Error sending Payment confirmation email");
            console.log(errorMessage);

            // LOG TO SLACK
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  schedule.scheduleJob("Three days to marathon", date, async () => {
    const payments = await findAll();

    const promises = await Promise.all(
      payments
        .filter((item) => item.status === "successful")
        .map(async (payment) => {
          const data = {
            email: payment.user.email,
            name: payment.user.name,
          };

          const { error, errorMessage } = await three_days_reminder(data);

          if (error) {
            console.log("Error sending Payment confirmation email");
            console.log(errorMessage);

            // LOG TO SLACK
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  schedule.scheduleJob("Day of marathon", date, async () => {
    const payments = await findAll();

    const promises = await Promise.all(
      payments
        .filter((item) => item.status === "successful")
        .map(async (payment) => {
          const data = {
            email: payment.user.email,
            name: payment.user.name,
          };

          const { error, errorMessage } = await day_of_event_reminder(data);

          if (error) {
            console.log("Error sending Payment confirmation email");
            console.log(errorMessage);

            // LOG TO SLACK
            // return errorMessage;
          }

          return payment;
        })
    );
  });
};

export default runScheduler;
