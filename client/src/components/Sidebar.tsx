import type { SidebarProps } from "../types";
import Avatar from "./Avatar";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/chat";

function Sidebar({ contacts, activeId, onSelect }: SidebarProps) {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-base font-bold text-gray-800 tracking-wide">
          Messages
        </h1>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-100">
        <input
          type="text"
          placeholder="Rechercher…"
          className="w-full px-3 py-1.5 text-sm bg-gray-100 rounded-lg border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-indigo-300 focus:bg-white transition"
        />
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact._id}
            onClick={() => onSelect(contact)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              activeId === contact._id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            {user && <Avatar user={contact} />}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-800 truncate capitalize">
                {contact.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom — Profile + Logout */}
      <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3">
        {/* Avatar + name → clique vers /profile */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 flex-1 min-w-0 hover:bg-gray-50 rounded-lg p-1 transition-colors"
        >
          {user && <Avatar user={user} />}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-gray-800 truncate capitalize">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate">Voir le profil</p>
          </div>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          title="Se déconnecter"
          className="group flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 6a9 9 0 100-18"
            />
          </svg>
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Déconnexion
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
