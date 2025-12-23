import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_CONFIG = {
  ACCEPTED: {
    label: "Принят",
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
};

const CustomerBlock = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="p-4 mt-4 bg-blue-50 rounded-xl">
      <div className="mb-1 font-semibold">Клиент</div>

      <div className="text-sm">
        {customer.firstName} {customer.lastName}
      </div>

      {customer.phone && (
        <div className="mt-1 text-sm text-gray-600">
          Телефон: {customer.phone}
        </div>
      )}

      {customer.telegram && (
        <div className="mt-1 text-sm">
          Telegram:{" "}
          <a
            href={`https://t.me/${customer.telegram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {customer.telegram}
          </a>
        </div>
      )}
    </div>
  );
};

export default function TakenOrders() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await api.get("/technician/orders/taken");
        if (!cancelled) setOrders(data || []);
      } catch (e) {
        if (!cancelled) {
          setMsg(e?.response?.data?.message || "Ошибка загрузки заказов");
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const startOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/technician/orders/${id}/start`);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: "IN_PROGRESS" } : o
        )
      );
      setMsg("Работа начата");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось начать заказ");
    }
  };

  const completeOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/technician/orders/${id}/complete`);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: "COMPLETED" } : o
        )
      );
      setMsg("Заказ завершён");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось завершить заказ");
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold">Принятые заказы</h2>

        {msg && <div className="mb-4 text-gray-700">{msg}</div>}

        {orders.length === 0 && (
          <div className="text-gray-600">
            У вас пока нет активных заказов.
          </div>
        )}

        <div className="grid gap-6">
          {orders.map((o) => {
            const status = STATUS_CONFIG[o.status];

            return (
              <div
                key={o.id}
                className="p-6 bg-white border rounded-2xl"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="text-lg font-semibold">
                    {o.title}
                  </div>

                  {status && (
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  )}
                </div>

                {/* BODY */}
                <div className="mb-2 text-gray-700">
                  {o.description}
                </div>

                <div className="mb-1 text-sm text-gray-500">
                  Категория: {o.category}
                </div>

                <div className="text-sm text-gray-500">
                  Адрес: {o.address}
                </div>

                {/* CUSTOMER */}
                {o.customer && <CustomerBlock customer={o.customer} />}

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {o.status === "ACCEPTED" && (
                    <button
                      onClick={() => startOrder(o.id)}
                      className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Начать работу
                    </button>
                  )}

                  {o.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => completeOrder(o.id)}
                      className="px-4 py-2 text-sm text-green-700 transition border border-green-600 rounded-lg hover:bg-green-50"
                    >
                      Завершить работу
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
