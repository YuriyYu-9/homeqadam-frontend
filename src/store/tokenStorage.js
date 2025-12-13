import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "hq_token";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getRoleFromToken = (token = getToken()) => {
  if (!token) return null;

  try {
    const payload = jwtDecode(token);

    // твой JWT сейчас НЕ содержит role — fallback оставляем
    return (
      payload.role ||
      payload.roles ||
      payload.authorities ||
      null
    );
  } catch {
    return null;
  }
};
