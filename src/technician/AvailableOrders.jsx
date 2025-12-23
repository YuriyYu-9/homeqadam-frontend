import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import { getAvailableOrders, acceptOrder } from "../api/orders.api";

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
        if (!cancelled) setOrders(data || []);
      } catch (e) {
        if (!cancelled) {
          setMsg(
            e?.response?.data?.message ||
              "Ошибка загрузки доступных заказов"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
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
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl px-4 mx-auto">
          <div className="p-6 text-yellow-800 border border-yellow-200 bg-yellow-50 rounded-xl">
            Заполните профиль, чтобы видеть и принимать заказы.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold">Доступные заказы</h2>

        {loading && <div>Загрузка…</div>}
        {msg && <div className="mb-4 text-gray-700">{msg}</div>}

        {!loading && orders.length === 0 && (
          <div className="text-gray-600">
            Сейчас нет доступных заказов.
          </div>
        )}

        <div className="grid gap-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-6 bg-white border rounded-2xl"
            >
              {/* HEADER */}
              <div className="mb-2 text-lg font-semibold">
                {o.title}
              </div>

              <div className="mb-2 text-sm text-gray-500">
                Категория: {o.category}
              </div>

              {/* DESCRIPTION */}
              <div className="mb-2 text-gray-700">
                {o.description}
              </div>

              <div className="text-sm text-gray-500">
                Адрес: {o.address}
              </div>

              {/* CUSTOMER */}
              {o.customer && <CustomerBlock customer={o.customer} />}

              {/* ACTION */}
              <div className="mt-6">
                <button
                  onClick={() => onAccept(o.id)}
                  className="px-5 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Принять заказ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
