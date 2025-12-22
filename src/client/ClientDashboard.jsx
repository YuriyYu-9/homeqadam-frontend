import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h1>Кабинет клиента</h1>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Быстрый старт</h3>
          <p>Создайте заказ — это займёт пару минут.</p>
          <Link to="/client/orders/new">Сделать заказ</Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Мои заказы</h3>
          <p>Посмотрите статус ваших последних заказов.</p>
          <Link to="/client/orders">Открыть список</Link>
        </div>
      </div>
    </div>
  );
}
