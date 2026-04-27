import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import conversationRouter from "./routes/conversation.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("✅ Un client connecté :", socket.id);
});

app.use("/api/auth", authRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
