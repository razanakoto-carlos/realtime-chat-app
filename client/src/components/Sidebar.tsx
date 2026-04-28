import type { SidebarProps } from "../types";
import Avatar from "./Avatar";

function Sidebar({ contacts, activeId, onSelect }:SidebarProps) {
  return (
    <div className="w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-base font-bold text-gray-800 tracking-wide">
          Messages
        </h1>
      </div>
      <div className="px-3 py-2 border-b border-gray-100">
        <input
          type="text"
          placeholder="Rechercher…"
          className="w-full px-3 py-1.5 text-sm bg-gray-100 rounded-lg border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-indigo-300 focus:bg-white transition"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact._id}
            onClick={() => onSelect(contact)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              activeId === contact._id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <Avatar />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-800 truncate capitalize">
                {contact.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
