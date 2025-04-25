import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
   user: User | null;
   accessToken: string | null;
   onAuthSuccess: (user: User, accessToken: string) => void;
   onLogout: () => void;
};

export const useAuthStore = create<AuthStore>()(
   persist(
      (set) => ({
         user: null,
         accessToken: null,
         onAuthSuccess: (user, accessToken) => {
            set({ user, accessToken });
         },
         onLogout: () => {
            set({ user: null, accessToken: null });
         },
      }),

      {
         name: "auth-storage",
         partialize: (state) => ({
            user: state.user,
            accessToken: state.accessToken,
         }),
      }
   )
);
