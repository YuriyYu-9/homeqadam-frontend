import api from "./axios";

export const register = (data) => api.post("/auth/register", data);
export const verify = (data) => api.post("/auth/verify", data);
export const login = (data) => api.post("/auth/login", data);
export const me = () => api.get("/auth/me");
