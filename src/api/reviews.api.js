import api from "./axios";

// создать отзыв по заказу
export const createReview = (orderId, data) =>
  api.post(`/reviews/order/${orderId}`, data);

// публичные отзывы
export const getAllReviews = () =>
  api.get("/reviews");

// отзывы по мастеру
export const getReviewsByTechnician = (technicianId) =>
  api.get(`/reviews/technician/${technicianId}`);
