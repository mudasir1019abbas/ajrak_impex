import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService } from "../services/authService.js";
import { tokenStore } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    if (!tokenStore.get()) {
      setLoading(false);
      return;
    }
    authService
      .me()
      .then((res) => setUser(res.user))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user } = await authService.login(credentials);
    tokenStore.set(token);
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (details) => {
    const { token, user } = await authService.register(details);
    tokenStore.set(token);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
