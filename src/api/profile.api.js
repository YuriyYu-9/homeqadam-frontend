import api from "./axios";

export const profileMe = () => api.get("/profile/me");
export const profileUpsert = (data) => api.put("/profile/me", data);
