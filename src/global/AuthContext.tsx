import { createContext } from "react";
import type { User } from "../types";

export type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
