import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import { getAvailableOrders, acceptOrder } from "../api/orders.api";

export default function AvailableOrders() {
  const { profileCompleted } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!profileCompleted) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setMsg(null);

      try {
        const data = await getAvailableOrders();
        if (!cancelled) {
          setOrders(data || []);
        }
      } catch (e) {
        if (!cancelled) {
          setMsg(e?.response?.data?.message || "Ошибка загрузки доступных заказов");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [profileCompleted]);

  const onAccept = async (orderId) => {
    setMsg(null);

    try {
      await acceptOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setMsg("Заказ успешно принят");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Не удалось принять заказ");
    }
  };

  if (!profileCompleted) {
    return (
      <div style={{ padding: 24 }}>
        Заполните профиль, чтобы видеть доступные заказы.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>Доступные заказы</h2>

      {loading && <div style={{ marginTop: 12 }}>Загрузка…</div>}
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}

      {!loading && orders.length === 0 && (
        <div style={{ marginTop: 12 }}>
          Сейчас нет доступных заказов по вашей специализации.
        </div>
      )}

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <div>
              <b>{o.title}</b> — {o.status}
            </div>
            <div>{o.category}</div>
            <div style={{ color: "#555" }}>{o.description}</div>
            <div style={{ color: "#777" }}>{o.address}</div>

            <button onClick={() => onAccept(o.id)} style={{ marginTop: 8 }}>
              Принять заказ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
