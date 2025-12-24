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

  const [loading, setLoading] = useState(!!getToken());
  const [initialized, setInitialized] = useState(false); // 👈 ВАЖНО

  const loadSession = async () => {
    try {
      const userData = await me();
      setUser(userData);
      setRole(userData.role);

      const profile = await profileMe();
      setProfileCompleted(!!profile?.completed);

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
      setInitialized(true); // 👈 КЛЮЧЕВО
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setInitialized(true);
      return;
    }

    setLoading(true);
    loadSession();
  }, [token]);

  const loginWithToken = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
    setLoading(true);
    setInitialized(false);
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
    setRole(null);
    setProfileCompleted(false);
    setDisplayName(null);
    setLoading(false);
    setInitialized(true);
  };

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
      initialized, // 👈 ОТДАЁМ
      loginWithToken,
      logout,
      refreshProfile,
    }),
    [token, user, role, profileCompleted, displayName, loading, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
