import { useEffect, useState } from "react";
import api from "../api/axios";
import ReviewForm from "../reviews/ReviewForm";
import { Link } from "react-router-dom";

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

const TechnicianBlock = ({ tech }) => {
  if (!tech) return null;

  const avatarSrc = tech.avatarUrl || "/images/anonymus_avatar.png";

  return (
    <div className="flex items-start gap-4 p-4 mt-4 bg-blue-50 rounded-xl">
      <img
        src={avatarSrc}
        alt="avatar"
        className="flex-shrink-0 object-cover rounded-full w-14 h-14"
      />

      <div className="flex-1">
        <div className="font-semibold">
          {tech.firstName} {tech.lastName}
        </div>

        <div className="text-sm text-gray-600">
          {tech.specialty} · опыт {tech.experienceYears} лет
        </div>

        {tech.telegram && (
          <div className="mt-1 text-sm">
            Telegram:{" "}
            <a
              href={`https://t.me/${tech.telegram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {tech.telegram}
            </a>
          </div>
        )}

        <div className="mt-3">
          <Link
            to={`/technicians/${tech.userId}`}
            className="inline-block px-4 py-2 text-sm text-blue-600 transition border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Перейти в профиль мастера →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const data = await api.get("/client/orders/my");
      setOrders(data || []);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Ошибка загрузки заказов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/client/orders/${id}/cancel`);
      await loadOrders();
      setMsg("Заказ отменён");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось отменить заказ");
    }
  };

  const completeOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/client/orders/${id}/complete`);
      await loadOrders();
      setMsg("Заказ завершён");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось завершить заказ");
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold">Мои заказы</h2>

        {loading && <div>Загрузка…</div>}
        {msg && <div className="mb-4 text-gray-700">{msg}</div>}

        {!loading && orders.length === 0 && (
          <div className="text-gray-600">
            У вас пока нет заказов.
          </div>
        )}

        <div className="grid gap-6">
          {orders.map((o) => {
            const status = STATUS_CONFIG[o.status] || {
              label: o.status,
              className: "bg-gray-100 text-gray-700",
            };

            const canCancel = o.status === "NEW" || o.status === "ACCEPTED";
            const canComplete = o.status === "IN_PROGRESS";
            const canReview = o.status === "COMPLETED" && o.technician;

            return (
              <div
                key={o.id}
                className="p-6 bg-white border rounded-2xl"
              >
                {/* HEADER */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="text-lg font-semibold">
                    {o.title}
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* BODY */}
                <div className="mb-2 text-gray-700">
                  {o.description}
                </div>

                <div className="mb-2 text-sm text-gray-500">
                  Категория: {o.category}
                </div>

                <div className="text-sm text-gray-500">
                  Адрес: {o.address}
                </div>

                {/* TECH */}
                {o.technician && <TechnicianBlock tech={o.technician} />}

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {canCancel && (
                    <button
                      onClick={() => cancelOrder(o.id)}
                      className="px-4 py-2 text-sm text-red-600 transition border border-red-500 rounded-lg hover:bg-red-50"
                    >
                      Отменить заказ
                    </button>
                  )}

                  {canComplete && (
                    <button
                      onClick={() => completeOrder(o.id)}
                      className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Подтвердить завершение
                    </button>
                  )}

                  {canReview && reviewOrderId !== o.id && (
                    <button
                      onClick={() => setReviewOrderId(o.id)}
                      className="px-4 py-2 text-sm text-blue-600 transition border border-blue-500 rounded-lg hover:bg-blue-50"
                    >
                      Оставить отзыв
                    </button>
                  )}
                </div>

                {reviewOrderId === o.id && (
                  <div className="mt-6">
                    <ReviewForm
                      orderId={o.id}
                      onSuccess={async () => {
                        setReviewOrderId(null);
                        await loadOrders();
                      }}
                      onCancel={() => setReviewOrderId(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
