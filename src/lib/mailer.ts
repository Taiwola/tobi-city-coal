import { verifyTransporter, sendMail, transporter } from "../config/mailer.config";
import * as path from "path";
import ejs from "ejs";


interface EmailOptions {
    email: string;
    participant_fullname: string;
    participant_contact: number
    participant_name: string;
    customer_support_mail: string;
    category: string;
    city_coal_name: string;
    registrationId: string;

}



export async function email1({ email, participant_fullname, participant_contact, participant_name, customer_support_mail, city_coal_name, registrationId, category }: EmailOptions): Promise<{ error: boolean, errorMessage: string }> {
    
    const templatePath = path.join(__dirname, '..', '..', 'views', 'first_email.ejs');
    
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
            email, 
            participant_fullname, 
            participant_contact, 
            participant_name, 
            customer_support_mail, 
            city_coal_name, 
            registrationId, 
            category
        });

        mailOptions = {
            from: {
                name: "Newsletter",
                address: process.env.MAIL_USERNAME as string,
            },
            to: email,
            subject: "newsletter",
            html: template,
        };
        await sendMail(mailOptions);
        return { error: false, errorMessage: "" };
    } catch (error) {
        return { error: true, errorMessage: (error as Error).message };
    }
}


export async function transactionVerified(reciever_name: string, reciever_email: string, payment_amount:number , payment_type: string ) {

    const templatePath = path.join(__dirname, '..', '..', 'views', 'transaction_verify.ejs');

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
        const template = ejs.renderFile(templatePath, {
            payment_username: reciever_name,
            city_coal_name: "coal",
            customer_support_mail: "coal_city@gmail",
            payment_type: payment_type,
            payment_amount: payment_amount
        });

        mailOptions = {
            from: {
                name: "Newsletter",
                address: process.env.MAIL_USERNAME as string,
            },
            to: reciever_email,
            subject: "Payment Confirmation",
            html: template,
        };
        await sendMail(mailOptions);
        return { error: false, errorMessage: "" };
    } catch (error) {
        return { error: true, errorMessage: (error as Error).message };
    }


}