import type { Request, Response } from "express";
import Message from "../models/Message";
import type { AuthRequest } from "../middleware/auth.middleware";

export async function getMessage(req: Request, res: Response) {
  try {
    const conversationId = req.params;

    const messages = Message.find({ conversation: conversationId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.status(200).json({ messages: messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function deleteMessage(req: AuthRequest, res: Response) {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message introuvable" });
    }

    if (message.sender.toString() !== req.user._Id) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
