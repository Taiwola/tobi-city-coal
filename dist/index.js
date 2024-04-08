"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
try {
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(process.env.MONGODB_URL);
    console.log('ok');
}
catch (error) {
    console.log(error);
    throw new Error("Databased refuse to connect");
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use((0, helmet_1.default)());
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
