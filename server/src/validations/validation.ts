import { z } from "zod";

export const conversationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type: z.enum(["private", "group"]),
  members: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Identifiant invalide")),
  avatar: z.string().nullable().optional(),
  createdAt: z.date().optional(),
});

export const messageSchema = z.object({
  sender: z.string().regex(/^[0-9a-fA-F]{24}$/, "Identifiant invalide"),
  conversation: z.string().regex(/^[0-9a-fA-F]{24}$/, "Identifiant invalide"),
  content: z.string().min(1, "Le message ne peut pas être vide"),
  createdAt: z.date().optional(),
});
