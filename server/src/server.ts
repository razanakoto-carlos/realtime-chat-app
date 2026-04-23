import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
