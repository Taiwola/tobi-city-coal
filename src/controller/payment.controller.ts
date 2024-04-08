import { Request, Response } from 'express';
import got from 'got';



export const payment = async (req: Request, res: Response) => {
    try {
        const response: any = await got.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            json: {
                tx_ref: "your_unique_transaction_reference",
                amount: req.body.amount,
                currency: req.body.currency || "NGN",
                redirect_url: req.body.redirect_url,
                meta: req.body.meta || {},
                customer: req.body.customer || {},
                customizations: req.body.customizations || {}
            }
        }).json();

        // Respond with the payment link
        res.json({
            status: "success",
            message: "Hosted Link",
            data: {
                link: response?.data.link
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while initializing payment" });
    }
};

export const flwWebhook = async (req: Request, res: Response) => {
    try {
        // Verify the signature to ensure the request is from Flutterwave
        const secretHash = process.env.FLW_SECRET_HASH;
        const signature = req.headers["verif-hash"];

        if (!signature || signature !== secretHash) {
            // The request is not from Flutterwave; discard
            return res.status(401).end();
        }

        // Process the webhook payload
        const payload = req.body;
        console.log(payload);

        // Handle duplicates (if necessary)
        // You can check the transaction status and update your records accordingly

        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
};
