import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, saveToken, clearToken } from "./tokenStorage";
import { me } from "../api/auth.api";
import { profileMe } from "../api/profile.api";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [loading, setLoading] = useState(() => !!getToken());

  const loadSession = async () => {
    try {
      const userData = await me();
      setUser(userData);
      setRole(userData.role);

      const profile = await profileMe();
      const completed = !!profile?.completed;

      setProfileCompleted(completed);

      const fn = profile?.firstName || "";
      const ln = profile?.lastName || "";
      const dn = `${fn} ${ln}`.trim();

      setDisplayName(dn || userData.email);
    } catch {
      clearToken();
      setToken(null);
      setUser(null);
      setRole(null);
      setProfileCompleted(false);
      setDisplayName(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    loadSession();
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
    setProfileCompleted(false);
    setDisplayName(null);
    setLoading(false);
  };

  // 🔥 НОВОЕ: публичный метод обновления профиля
  const refreshProfile = async () => {
    setLoading(true);
    await loadSession();
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      user,
      role,
      profileCompleted,
      displayName,
      loading,
      loginWithToken,
      logout,
      refreshProfile, // 👈 ВАЖНО
    }),
    [token, user, role, profileCompleted, displayName, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
