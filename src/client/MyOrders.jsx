import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_LABELS = {
  NEW: "Новый",
  ACCEPTED: "Принят мастером",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setMsg(null);
      try {
        const data = await api.get("/client/orders/my");
        if (!cancelled) setOrders(data || []);
      } catch (e) {
        if (!cancelled) {
          setMsg(e?.response?.data?.message || "Ошибка загрузки заказов");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => (cancelled = true);
  }, []);

  const cancelOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/client/orders/${id}/cancel`);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status: "CANCELLED", cancelledAt: new Date().toISOString() }
            : o
        )
      );
      setMsg("Заказ отменён");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось отменить заказ");
    }
  };

  const completeOrder = async (id) => {
    setMsg(null);
    try {
      await api.post(`/client/orders/${id}/complete`);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status: "COMPLETED", completedAt: new Date().toISOString() }
            : o
        )
      );
      setMsg("Заказ завершён");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось завершить заказ");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>Мои заказы</h2>

      {loading && <div>Загрузка…</div>}
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}

      {!loading && orders.length === 0 && <div>Пока нет заказов.</div>}

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {orders.map((o) => {
          const canCancel = o.status === "NEW" || o.status === "ACCEPTED";
          const canComplete = o.status === "IN_PROGRESS";

          return (
            <div key={o.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
              <div>
                <b>{o.title}</b> — {STATUS_LABELS[o.status] || o.status}
              </div>

              <div>{o.category}</div>
              <div style={{ color: "#555" }}>{o.description}</div>
              <div style={{ color: "#777" }}>{o.address}</div>

              {canCancel && (
                <button onClick={() => cancelOrder(o.id)} style={{ marginTop: 8 }}>
                  Отменить заказ
                </button>
              )}

              {canComplete && (
                <button onClick={() => completeOrder(o.id)} style={{ marginTop: 8 }}>
                  Подтвердить завершение
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
