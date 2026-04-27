import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import CheckIcon from "./CheckIcon";
import SendIcon from "./SendIcon";

function ChatWindow({ contact, contactIndex, messages, onSend }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
      {/* Header conversation */}
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3">
        <Avatar online={contact.online} />
        <div>
          <p className="text-sm font-bold text-gray-800">{contact.name}</p>
          <p className="text-xs text-emerald-500">
            {contact.online ? "En ligne" : "Hors ligne"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3.5 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.from === "me"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
              }`}
            >
              {msg.text}
              <div
                className={`flex items-center justify-end gap-1 mt-0.5 ${
                  msg.from === "me" ? "text-gray-400" : "text-gray-400"
                }`}
              >
                <span className="text-xs opacity-60">{msg.time}</span>
                {msg.from === "me" && <CheckIcon double />}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Écrire un message…"
          className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full border-none outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 focus:bg-white transition"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-9 h-9 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow