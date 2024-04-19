import schedule from "node-schedule";

import { findAll } from "./service/payment.service";
import {
  day_of_event_reminder,
  one_weeks_reminder,
  three_days_reminder,
  two_weeks_reminder,
} from "./lib/mailer";
import { slackApp } from "./config/slack.config";

const runScheduler = () => {
  console.log("Waiting to run scheduled jobs");

  // const date = new Date(2024, 3, 10, 2, 25, 0);

  
  const marathonDate = new Date("2024-05-04T10:00:00");
  const twoWeeksDate = new Date(marathonDate);
  twoWeeksDate.setDate(twoWeeksDate.getDate() - 14);

  schedule.scheduleJob("Two weeks to marathon", twoWeeksDate, async () => {
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
            await slackApp.client.chat.postMessage({
              token: process.env.SLACK_BOT_TOKEN as string,
              channel: process.env.SLACK_CHANNEL as string,
              text: errorMessage,
            });
            throw new Error(errorMessage);
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  const oneWeekDate = new Date(marathonDate);
  oneWeekDate.setDate(oneWeekDate.getDate() - 7);

  schedule.scheduleJob("One week to marathon", oneWeekDate, async () => {
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
            await slackApp.client.chat.postMessage({
              token: process.env.SLACK_BOT_TOKEN as string,
              channel: process.env.SLACK_CHANNEL as string,
              text: errorMessage,
            });
            throw new Error(errorMessage);
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  const threeDaysDate = new Date(marathonDate);
  threeDaysDate.setDate(threeDaysDate.getDate() - 3);
  schedule.scheduleJob("Three days to marathon", threeDaysDate, async () => {
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
            await slackApp.client.chat.postMessage({
              token: process.env.SLACK_BOT_TOKEN as string,
              channel: process.env.SLACK_CHANNEL as string,
              text: errorMessage,
            });
            throw new Error(errorMessage);
            // return errorMessage;
          }

          return payment;
        })
    );
  });

  const dayOfEventDate = new Date(marathonDate);
  dayOfEventDate.setHours(7, 0, 0, 0);
  schedule.scheduleJob("Day of marathon", dayOfEventDate, async () => {
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
            await slackApp.client.chat.postMessage({
              token: process.env.SLACK_BOT_TOKEN as string,
              channel: process.env.SLACK_CHANNEL as string,
              text: errorMessage,
            });
            throw new Error(errorMessage);
            // return errorMessage;
          }

          return payment;
        })
    );
  });
};

export default runScheduler;
