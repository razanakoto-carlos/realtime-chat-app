import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["private", "group"], required: true },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  avatar: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
