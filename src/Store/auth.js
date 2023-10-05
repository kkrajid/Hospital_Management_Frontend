import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
 
  persist(
    (set) => ({
      access: "",
      isAuth: false,
      setToken: (access) =>
        set((state) => ({
          access,
          isAuth: !!access,
        })),
      logout: () =>
        set((state) => ({
          access: "",
          isAuth: false,
        })),
    }),
    {
      name: "auth",
    }
  )
);

export { useAuthStore };
