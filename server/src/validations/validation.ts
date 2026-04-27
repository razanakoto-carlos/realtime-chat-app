import { z } from "zod";

export const conversationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  type: z.enum(["private", "group"]),
  members: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")),
  avatar: z.string().nullable().optional(),
  createdAt: z.date().optional(),
});

export const messageSchema = z.object({
  sender: z.string().regex(/^[0-9a-fA-F]{24}$/),
  conversation: z.string().regex(/^[0-9a-fA-F]{24}$/),
  content: z.string().min(1, "Content must be at least a characters"),
  createdAt: z.date().optional(),
});
