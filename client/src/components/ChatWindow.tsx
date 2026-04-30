import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import SendIcon from "./SendIcon";
import type { ChatWindowProps } from "../types";

function ChatWindow({ contact, messages, onSend }:ChatWindowProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F0F2F5] min-w-0">
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3 shadow-sm">
        <Avatar user={contact} />
        <div>
          <p className="text-sm font-bold text-[#050505] capitalize">{contact.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages && messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender._id === contact._id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.sender._id === contact._id
                  ? "bg-[#E4E6EB] text-[#050505] rounded-tl-sm"
                  : "bg-[#0084FF] text-white rounded-tr-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Aa"
          className="flex-1 px-4 py-2 text-sm bg-[#F0F2F5] rounded-full border-none outline-none text-[#050505] placeholder-gray-400 focus:ring-2 focus:ring-[#0084FF] transition"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-9 h-9 bg-[#0084FF] hover:bg-[#0073E6] disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <SendIcon />
        </button>
      </div>

    </div>
  );
}

export default ChatWindow;