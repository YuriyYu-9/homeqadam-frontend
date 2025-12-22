import { Link } from "react-router-dom";

export default function TechnicianDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h1>Кабинет специалиста</h1>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Найти заказы</h3>
          <p>Посмотрите доступные заказы по категории и примите нужный.</p>
          <Link to="/technician/orders">Найти заказы</Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Принятые заказы</h3>
          <p>Ваши текущие принятые заказы.</p>
          <Link to="/technician/orders/taken">Открыть</Link>
        </div>
      </div>
    </div>
  );
}
