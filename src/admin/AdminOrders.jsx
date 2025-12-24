import { useEffect, useState } from "react";
import { getAllOrdersAdmin } from "../api/orders.api";
import Container from "../components/ui/Container";

/* Цвета статусов */
const statusStyles = {
  NEW: "bg-blue-100 text-blue-800",
  ACCEPTED: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllOrdersAdmin()
      .then(setOrders)
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить заказы");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Админ-панель</h1>
        <p className="mt-1 text-gray-600">
          Все заказы, созданные в системе
        </p>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white border shadow-sm rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="text-gray-600 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left border-b">ID</th>
                <th className="px-4 py-3 text-left border-b">Категория</th>
                <th className="px-4 py-3 text-left border-b">Заголовок</th>
                <th className="px-4 py-3 text-left border-b">Описание</th>
                <th className="px-4 py-3 text-left border-b">Статус</th>
                <th className="px-4 py-3 text-left border-b">Клиент</th>
                <th className="px-4 py-3 text-left border-b">Мастер</th>
                <th className="px-4 py-3 text-left border-b">Создан</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-500 border-b">
                    #{o.id}
                  </td>

                  <td className="px-4 py-3 border-b">
                    {o.category}
                  </td>

                  <td className="px-4 py-3 font-medium border-b">
                    {o.title}
                  </td>

                  <td className="max-w-xs px-4 py-3 border-b">
                    <p className="overflow-hidden text-gray-600 line-clamp-2">
                      {o.description || "—"}
                    </p>
                  </td>

                  <td className="px-4 py-3 border-b">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        statusStyles[o.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b">
                    {o.customer
                      ? `${o.customer.firstName ?? ""} ${o.customer.lastName ?? ""}`
                      : "—"}
                  </td>

                  <td className="px-4 py-3 border-b">
                    {o.technician
                      ? `${o.technician.firstName ?? ""} ${o.technician.lastName ?? ""}`
                      : "—"}
                  </td>

                  <td className="px-4 py-3 text-gray-500 border-b">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Заказов нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
