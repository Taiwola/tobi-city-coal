import mongoose from "mongoose";


type NewsletterType = {
    user_email: string
    user_firstname: string,
    user_lastname: string,
    user_contact_number: string
}

const newsletterSchema = new mongoose.Schema({
    user_email: {type: String,  required: true},
    user_firstname: {type: String,  required: true},
    user_lastname: {type: String,  required: true},
    user_contact_number: {type: Number, required: true}
});

const Newsletter = mongoose.model<NewsletterType>("newsletter", newsletterSchema);


export default Newsletter;