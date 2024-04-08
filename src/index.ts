import "dotenv/config"
import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import path from "path";

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

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: "*"
}));
app.use(helmet());



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})