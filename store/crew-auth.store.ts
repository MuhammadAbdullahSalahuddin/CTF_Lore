import { create } from "zustand";

interface CrewAuthState {
  accessToken: string | null;
  email: string | null;
  setAuth: (token: string, email: string) => void;
  clearAuth: () => void;
}

export const useCrewAuthStore = create<CrewAuthState>((set) => ({
  accessToken: null,
  email: null,
  setAuth: (accessToken, email) => set({ accessToken, email }),
  clearAuth: () => set({ accessToken: null, email: null }),
}));
