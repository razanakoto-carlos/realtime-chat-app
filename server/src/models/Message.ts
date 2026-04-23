import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    content: { type: String, required: true },
})