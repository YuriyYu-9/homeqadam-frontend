import api from "./axios";

/**
 * CLIENT
 */

// создать заказ
export const createOrder = (data) =>
  api.post("/orders", data);

// мои заказы клиента
export const getMyOrders = () =>
  api.get("/client/orders/my");

// отменить заказ
export const cancelOrder = (orderId) =>
  api.post(`/client/orders/${orderId}/cancel`);

// подтвердить завершение
export const completeOrder = (orderId) =>
  api.post(`/client/orders/${orderId}/complete`);


/**
 * TECHNICIAN
 */

// доступные заказы (категория берётся на бэке из профиля)
export const getAvailableOrders = () =>
  api.get("/technician/orders/available");

// принять заказ
export const acceptOrder = (orderId) =>
  api.post(`/technician/orders/${orderId}/accept`);

// заказы, взятые мастером
export const getTakenOrders = () =>
  api.get("/technician/orders/taken");


/**
 * ADMIN
 */

// все заказы в системе (админ-панель)
export const getAllOrdersAdmin = () =>
  api.get("/admin/orders");
