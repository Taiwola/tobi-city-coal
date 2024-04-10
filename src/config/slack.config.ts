import Slack from "@slack/bolt/dist/App";

export const slackApp = new Slack({
    signingSecret: process.env.SLACK_SIGNIN_SECRET as string,
    token: process.env.SLACK_BOT_TOKEN as string
  });
  

//   app.get('/api/slack', async (req:Request, res: Response) => {
//     const slackMessage = await slackApp.client.chat.postMessage({
//       token: process.env.SLACK_BOT_TOKEN as string,
//       channel: process.env.SLACK_CHANNEL as string,
//       text: "this is a test"
//     });
  
//     if (!slackMessage) {
//       return res.status(403).json({message: "something went wrong"});
//     };
  
//     return res.status(200).json({message: "message was sent"})
//   });
  