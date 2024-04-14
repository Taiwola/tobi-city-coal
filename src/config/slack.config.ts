import Slack from "@slack/bolt/dist/App";

export const slackApp = new Slack({
    signingSecret: process.env.SLACK_SIGNIN_SECRET as string,
    token: process.env.SLACK_BOT_TOKEN as string
  });
  