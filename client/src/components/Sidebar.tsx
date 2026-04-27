import Avatar from "./Avatar";

function Sidebar({ contacts, activeId, onSelect }) {
  return (
    <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-base font-bold text-gray-800 tracking-wide">Messages</h1>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-100">
        <input
          type="text"
          placeholder="Rechercher…"
          className="w-full px-3 py-1.5 text-sm bg-gray-100 rounded-lg border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-indigo-300 focus:bg-white transition"
        />
      </div>

      {/* Liste */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              activeId === c.id
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <Avatar online={c.online} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-semibold text-gray-800 truncate">{c.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{c.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 truncate">{c.lastMsg}</span>
                {c.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar