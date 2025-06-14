import { useState, useEffect, type ReactNode } from "react";
import { UserSchema, type User } from "../types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const parsed = JSON.parse(atob(storedToken.split(".")[1]));
        const validatedUser = UserSchema.parse(parsed);
        setUser(validatedUser);
      } catch {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const validatedUser = UserSchema.parse(payload);
      setUser(validatedUser);
      localStorage.setItem("token", token);
    } catch {
      console.error("Invalid token");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
