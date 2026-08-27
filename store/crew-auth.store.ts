import { create } from "zustand";

interface CrewAuthState {
  accessToken: string | null;
  email: string | null;
  crewHandle: string | null;
  setAuth: (token: string, email: string, crewdHandle: string) => void;
  setCrewHandle: (crewHandle: string) => void;
  clearAuth: () => void;
}

export const useCrewAuthStore = create<CrewAuthState>((set) => ({
  accessToken: null,
  email: null,
  crewHandle: null,
  setAuth: (accessToken, email, crewHandle) =>
    set({ accessToken, email, crewHandle }),
  setCrewHandle: (crewHandle) => set({ crewHandle }),
  clearAuth: () => set({ accessToken: null, email: null, crewHandle: null }),
}));
