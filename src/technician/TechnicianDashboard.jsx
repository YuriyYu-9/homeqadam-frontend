import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvailableOrders, acceptOrder } from "../api/orders.api";
import api from "../api/axios";
import { useAuth } from "../store/useAuth";

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

export default function TechnicianDashboard() {
  const { profileCompleted } = useAuth();

  const [available, setAvailable] = useState([]);
  const [taken, setTaken] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (profileCompleted) {
          const availableData = await getAvailableOrders();
          if (!cancelled) {
            setAvailable((availableData || []).slice(0, 3));
          }
        }

        const takenData = await api.get("/technician/orders/taken");
        if (!cancelled) {
          setTaken((takenData || []).slice(0, 3));
        }
      } catch (e) {
        console.error(e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [profileCompleted]);

  const onAccept = async (id) => {
    setMsg(null);
    try {
      await acceptOrder(id);
      setAvailable((prev) => prev.filter((o) => o.id !== id));
      setMsg("Заказ принят");

      const takenData = await api.get("/technician/orders/taken");
      setTaken((takenData || []).slice(0, 3));
    } catch (e) {
      setMsg(e?.response?.data?.message || "Ошибка принятия заказа");
    }
  };

  const startOrder = async (id) => {
    try {
      await api.post(`/technician/orders/${id}/start`);
      const takenData = await api.get("/technician/orders/taken");
      setTaken((takenData || []).slice(0, 3));
    } catch (e) {
      console.error(e);
    }
  };

  const completeOrder = async (id) => {
    try {
      await api.post(`/technician/orders/${id}/complete`);
      const takenData = await api.get("/technician/orders/taken");
      setTaken((takenData || []).slice(0, 3));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* INTRO */}
        <div className="p-6 mb-8 border border-blue-100 bg-blue-50 rounded-2xl">
          <h1 className="mb-2 text-2xl font-bold">Кабинет специалиста</h1>
          <p className="text-gray-700">
            Здесь вы можете находить новые заказы и управлять текущими задачами.
          </p>
        </div>

        {!profileCompleted && (
          <div className="p-4 mb-6 text-yellow-800 border border-yellow-200 bg-yellow-50 rounded-xl">
            Заполните профиль, чтобы получать доступ к заказам.
          </div>
        )}

        {msg && <div className="mb-4 text-gray-700">{msg}</div>}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* AVAILABLE */}
          <div className="p-6 bg-white border rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">Доступные заказы</h2>

            {available.length === 0 && (
              <div className="text-gray-600">Сейчас нет доступных заказов.</div>
            )}

            <div className="grid gap-4">
              {available.map((o) => (
                <div key={o.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="font-semibold">{o.title}</div>
                  <div className="text-sm text-gray-600">{o.category}</div>
                  <div className="text-sm text-gray-500">{o.address}</div>

                  <button
                    onClick={() => onAccept(o.id)}
                    className="px-4 py-2 mt-3 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Принять заказ
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                to="/technician/orders"
                className="text-sm text-blue-600 hover:underline"
              >
                Смотреть все доступные →
              </Link>
            </div>
          </div>

          {/* TAKEN */}
          <div className="p-6 bg-white border rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">Текущие заказы</h2>

            {taken.length === 0 && (
              <div className="text-gray-600">
                У вас пока нет активных заказов.
              </div>
            )}

            <div className="grid gap-4">
              {taken.map((o) => {
                const status = STATUS_CONFIG[o.status];

                return (
                  <div key={o.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold">{o.title}</div>

                      {status && (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">{o.category}</div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {o.status === "ACCEPTED" && (
                        <button
                          onClick={() => startOrder(o.id)}
                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Начать работу
                        </button>
                      )}

                      {o.status === "IN_PROGRESS" && (
                        <button
                          onClick={() => completeOrder(o.id)}
                          className="px-4 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50"
                        >
                          Завершить работу
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                to="/technician/orders/taken"
                className="text-sm text-blue-600 hover:underline"
              >
                Смотреть все принятые →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
