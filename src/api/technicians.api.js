import api from "./axios";

export const getPublicTechnician = (userId) =>
  api.get(`/public/technicians/${userId}`);

export const listPublicTechnicians = () =>
  api.get(`/public/technicians`);
