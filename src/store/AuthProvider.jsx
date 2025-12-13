import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  getToken,
  saveToken,
  clearToken,
} from "./tokenStorage";
import { me } from "../api/auth.api";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(() => !!getToken());

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadMe = async () => {
      try {
        const userData = await me(); // ⬅️ УЖЕ data

        if (cancelled) return;

        setUser(userData);
        setRole(userData.role);
      } catch {
        if (cancelled) return;

        clearToken();
        setToken(null);
        setUser(null);
        setRole(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMe();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const loginWithToken = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
    setLoading(true);
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      loading,
      loginWithToken,
      logout,
    }),
    [token, user, role, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
