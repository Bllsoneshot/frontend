import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, UserRole } from "../@types/auth";

interface AuthStore extends AuthState {
  setAuth: (accessToken: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      isAuthenticated: false,

      setAuth: (accessToken: string, role: UserRole) =>
        set({
          accessToken,
          role,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
