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
import Message from "./models/Message";

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
const io = new Server(httpServer, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("✅ Un client connecté :", socket.id);

  // 1. Le frontend rejoint une room = une conversation
  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
    console.log(`📥 A rejoint la room : ${conversationId}`);
  });

  // 2. Le frontend envoie un message
  socket.on("sendMessage", async (data) => {
    // data = { senderId, conversationId, content }
    try {
      // Sauvegarde en MongoDB
      const message = await Message.create({
        sender: data.senderId,
        conversation: data.conversationId,
        content: data.content,
      });

      // Diffuse à tous les membres de la room
      io.to(data.conversationId).emit("newMessage", message);

    } catch (error) {
      console.log("❌ Erreur sendMessage :", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client déconnecté :", socket.id);
  });
});

app.use("/api/auth", authRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});