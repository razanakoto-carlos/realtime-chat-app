import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { authenticate } from "../api/chat";

// ── Données de démonstration ─────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 1,
    name: "Alice Martin",
    initials: "AM",
    lastMsg: "À tout à l'heure !",
    time: "09:41",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Bob Dupont",
    initials: "BD",
    lastMsg: "Tu as vu le dernier commit ?",
    time: "Hier",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Clara Noel",
    initials: "CN",
    lastMsg: "Merci pour ton aide 🙏",
    time: "Lun",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "David Leroy",
    initials: "DL",
    lastMsg: "On se retrouve à 14h ?",
    time: "Dim",
    unread: 5,
    online: false,
  },
];

const INITIAL_MESSAGES = {
  1: [
    {
      id: 1,
      from: "them",
      text: "Salut ! Tu es disponible ce matin ?",
      time: "09:30",
    },
    {
      id: 2,
      from: "me",
      text: "Oui, je suis là ! Qu'est-ce qu'il y a ?",
      time: "09:32",
    },
    {
      id: 3,
      from: "them",
      text: "J'ai besoin d'aide sur le projet Laravel.",
      time: "09:35",
    },
    {
      id: 4,
      from: "me",
      text: "Pas de problème, dis-moi tout.",
      time: "09:37",
    },
    { id: 5, from: "them", text: "À tout à l'heure !", time: "09:41" },
  ],
  2: [
    { id: 1, from: "them", text: "Tu as vu le dernier commit ?", time: "Hier" },
  ],
  3: [
    { id: 1, from: "me", text: "Je t'ai envoyé les fichiers.", time: "Lun" },
    { id: 2, from: "them", text: "Merci pour ton aide 🙏", time: "Lun" },
  ],
  4: [{ id: 1, from: "them", text: "On se retrouve à 14h ?", time: "Dim" }],
};

export default function Chat() {
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const contact = CONTACTS.find((c) => c.id === activeId);
  const contactIndex = CONTACTS.findIndex((c) => c.id === activeId);

  function handleSend(text) {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { id: Date.now(), from: "me", text, time },
      ],
    }));
  }


  return (
    // Fond gris global Breeze
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      {/* Carte principale */}
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden flex">
        {/* <Sidebar
          contacts={CONTACTS}
          activeId={activeId}
          onSelect={setActiveId}
        /> */}
        {contact ? (
          <ChatWindow
            contact={contact}
            contactIndex={contactIndex}
            messages={messages[activeId] || []}
            onSend={handleSend}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
