import type { Request, Response } from "express";
import Conversation from "../models/Conversation";
import type { AuthRequest } from "../middleware/auth.middleware";

export async function createConversation(req: AuthRequest, res: Response) {
  try {
    const { name, type, members } = req.body;

    const allMembers = [...new Set(...members, req.user._id)];

    const newConversation = new Conversation({
      name,
      type,
      members: allMembers,
    });

    const conversation = await newConversation.save();

    res.status(201).json({
      status: "conversation created successfully",
      convesation: conversation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function getMyConversation(req: AuthRequest, res: Response) {
  try {
    const conversation = Conversation.find({ members: req.user._id }).populate(
      "members",
      "name avatar",
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function deleteConversation(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
