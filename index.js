import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/routes.js";

// ENV Config
dotenv.config();

// DB Connection
connectDB();

// Express instance
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(router);
app.use("/uploads", express.static("./uploads"));

// PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});