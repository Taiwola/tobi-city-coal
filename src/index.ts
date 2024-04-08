import "dotenv/config"
import express from "express"
import mongoose from "mongoose";

try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL as string);
    console.log('ok')
} catch (error) {
    console.log(error);
    throw new Error("Databased refuse to connect")
}

const app = express();
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})