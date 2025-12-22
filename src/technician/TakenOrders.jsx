import { useEffect, useState } from "react";
import api from "../api/axios";

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
        if (!cancelled) setMsg(e?.response?.data?.message || "Ошибка загрузки");
      }
    };

    load();
    return () => (cancelled = true);
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
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>Принятые заказы</h2>

      {msg && <div style={{ marginBottom: 8 }}>{msg}</div>}

      {orders.length === 0 && <div>Пока нет заказов.</div>}

      <div style={{ display: "grid", gap: 12 }}>
        {orders.map((o) => (
          <div key={o.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <div><b>{o.title}</b> — {o.status}</div>
            <div>{o.category}</div>
            <div style={{ color: "#555" }}>{o.description}</div>
            <div style={{ color: "#777" }}>{o.address}</div>

            {o.status === "ACCEPTED" && (
              <button onClick={() => startOrder(o.id)} style={{ marginTop: 8 }}>
                Начать работу
              </button>
            )}

            {o.status === "IN_PROGRESS" && (
              <button onClick={() => completeOrder(o.id)} style={{ marginTop: 8 }}>
                Завершить работу
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
