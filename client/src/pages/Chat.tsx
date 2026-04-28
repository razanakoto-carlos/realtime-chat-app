import { use, useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import EmptyState from "../components/EmptyState";
import { useAuthStore } from "../store/useAuthStore";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

export default function Chat() {
  const { user } = useAuthStore();
  const [contacts, setContacts] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  async function handleSelectContact(contact) {
    const res = await fetch(`http://localhost:3000/api/conversation/private`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: user._id, receiverId: contact._id }),
    });
    const conversation = await res.json();
    const msgRes = await fetch(`http://localhost:3000/api/message/${conversation._id}`)
    const oldMessages = await msgRes.json();
    console.log("oldMessages reçu :", oldMessages);

    setActiveConversation({ ...conversation, contact });
    setMessages(oldMessages)

    socket.emit("joinRoom", conversation._id);
  }

  function handleSend(text) {
    socket.emit("sendMessage", {
      senderId: user._id,
      conversationId: activeConversation._id,
      content: text,
    });
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl h-150 bg-white rounded-2xl shadow-lg overflow-hidden flex">
        <Sidebar
          contacts={contacts}
          activeId={activeConversation?._id}
          onSelect={handleSelectContact}
        />
        {activeConversation ? (
          <ChatWindow
            contact={activeConversation.contact}
            messages={messages}
            onSend={handleSend}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
