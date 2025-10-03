import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Define the state shape and actions
interface SessionState {
  accessToken: string | null;
  role: string | null;
  isLoggedIn: boolean; // A derived/helper state for easier UI checks
}

interface SessionActions {
  setSession: (data: { accessToken: string; role: string }) => void;
  clearSession: () => void;
}

// 2. Define the initial state
const initialState: SessionState = {
  accessToken: null,
  role: null,
  isLoggedIn: false,
};

// 3. Create the store with persist middleware
export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Action to set the session data after login
      setSession: (data) =>
        set({
          accessToken: data.accessToken,
          role: data.role,
          isLoggedIn: true,
        }),

      // Action to clear the session data on logout
      clearSession: () => set(initialState),
    }),
    {
      // Configuration for the persist middleware
      name: "user-session", // Unique name for the storage item
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
