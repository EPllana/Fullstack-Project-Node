import React, { createContext, useContext, useState } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const signIn = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.token;
    await AsyncStorage.setItem("token", token);
    setUser({ email }); // mund ta marrësh user nga backend
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth duhet të përdoret brenda AuthProvider");
  return ctx;
};
