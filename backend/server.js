import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

await connectDB(); // Wait for the database connection to be established

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/users", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});