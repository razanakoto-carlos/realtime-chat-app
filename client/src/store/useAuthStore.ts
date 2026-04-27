import { create } from "zustand";
import type { Authregister } from "../types";
import { authenticate } from "../api/chat";

interface User extends Authregister {
  _id: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  checkAuth: async () => {
    try {
      const data = await authenticate();
      set({ user: data.user });
    } catch {
      set({ user: null });
    }
  },
}));
