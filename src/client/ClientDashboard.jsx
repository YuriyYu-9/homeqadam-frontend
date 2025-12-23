import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const STATUS_CONFIG = {
  NEW: {
    label: "Новый",
    className: "bg-blue-100 text-blue-700",
  },
  ACCEPTED: {
    label: "Принят мастером",
    className: "bg-yellow-100 text-yellow-800",
  },
  IN_PROGRESS: {
    label: "В работе",
    className: "bg-orange-100 text-orange-800",
  },
  COMPLETED: {
    label: "Завершён",
    className: "bg-green-100 text-green-700",
  },
  CANCELLED: {
    label: "Отменён",
    className: "bg-red-100 text-red-700",
  },
};

const categories = [
  "PLUMBING",
  "ELECTRICITY",
  "CLEANING",
  "APPLIANCE_REPAIR",
];

export default function ClientDashboard() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    category: "PLUMBING",
  });

  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await api.get("/client/orders/my");
      setOrders((data || []).slice(0, 5));
    } catch {
      // дашборд не должен падать
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const createOrder = async (e) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      await api.post("/client/orders", form);
      setMessage("Заказ успешно создан");
      setForm({
        title: "",
        description: "",
        address: "",
        category: "PLUMBING",
      });
      await loadOrders();
    } catch (e) {
      setMessage(e?.response?.data?.message || "Ошибка создания заказа");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* INTRO */}
        <div className="p-6 mb-8 border border-blue-100 bg-blue-50 rounded-2xl">
          <h1 className="mb-2 text-2xl font-bold">Кабинет клиента</h1>
          <p className="text-gray-700">
            Здесь вы можете быстро создать заказ и отслеживать его статус в
            режиме реального времени.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* CREATE ORDER */}
          <div className="p-6 bg-white border rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">
              Создать новый заказ
            </h2>

            <form onSubmit={createOrder} className="grid gap-4">
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Заголовок"
                required
                className="px-3 py-2 border rounded-lg"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Описание задачи"
                required
                rows={3}
                className="px-3 py-2 border rounded-lg"
              />

              <input
                name="address"
                value={form.address}
                onChange={onChange}
                placeholder="Адрес"
                required
                className="px-3 py-2 border rounded-lg"
              />

              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="px-3 py-2 border rounded-lg"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {creating ? "Создание..." : "Создать заказ"}
              </button>

              {message && (
                <div className="text-sm text-gray-700">{message}</div>
              )}
            </form>

            <div className="mt-4 text-sm">
              <Link
                to="/client/orders/new"
                className="text-blue-600 hover:underline"
              >
                Перейти к полной форме →
              </Link>
            </div>
          </div>

          {/* LAST ORDERS */}
          <div className="p-6 bg-white border rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">
              Последние заказы
            </h2>

            {loadingOrders && <div>Загрузка…</div>}

            {!loadingOrders && orders.length === 0 && (
              <div className="text-gray-600">
                У вас пока нет заказов.
              </div>
            )}

            <div className="grid gap-3">
              {orders.map((o) => {
                const status = STATUS_CONFIG[o.status] || {
                  label: o.status,
                  className: "bg-gray-100 text-gray-700",
                };

                return (
                  <div
                    key={o.id}
                    className="flex flex-col gap-2 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold">{o.title}</div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      Категория: {o.category}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                to="/client/orders"
                className="text-sm text-blue-600 hover:underline"
              >
                Посмотреть все заказы →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
