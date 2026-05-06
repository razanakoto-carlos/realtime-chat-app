import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
import type { Conversation, Message,User } from "../types";

const socket = io("http://localhost:3000", { withCredentials: true });

export function useChat() {
  const { user } = useAuthStore();
 const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        { ...message, isMe: message.sender._id === user?._id },
      ]);
    });
    return () => { socket.off("newMessage"); };
  }, [user?._id]);

  async function handleSelectContact(contact:User) {
    const res = await fetch(`http://localhost:3000/api/conversation/private`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: user?._id, receiverId: contact._id }),
    });
    const conversation = await res.json();

    const msgRes = await fetch(`http://localhost:3000/api/message/${conversation._id}`, {
      credentials: "include",
    });
    const oldMessages = await msgRes.json();

    setActiveConversation({ ...conversation, contact });
    setMessages(oldMessages);
    socket.emit("joinRoom", conversation._id);
  }

  function handleSend(text:string) {
    socket.emit("sendMessage", {
      senderId: user?._id,
      conversationId: activeConversation?._id,
      content: text,
    });
  }

  return { activeConversation, messages, handleSelectContact, handleSend };
}