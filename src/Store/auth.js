import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt_decode from "jwt-decode";

const useAuthStore = create(
  persist(
    (set) => ({
      access: "",
      isAuth: false,
      role: "",
      setToken: (access) => {
        set((state) => ({
          access,
          isAuth: !!access,
          role: decodeTokenAndGetRole(access),
        }));
      },
      logout: () =>
        set((state) => ({
          access: "",
          isAuth: false,
          role: "",
        })),
    }),
    {
      name: "auth",
    }
  )
);

const decodeTokenAndGetRole = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken.role; 
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return "";
  }
};

export {useAuthStore};
