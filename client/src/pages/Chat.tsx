import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import { useChat } from "../hooks/useChat";

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const { activeConversation, messages, handleSelectContact, handleSend } =
    useChat();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl h-150 bg-white rounded-2xl shadow-lg overflow-hidden flex">
        <Sidebar
          contacts={contacts}
          activeId={activeConversation!._id}
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
