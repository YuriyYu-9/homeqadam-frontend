import { useState } from "react";
import api from "../api/axios";

const categories = ["ELECTRICITY", "PLUMBING", "CLEANING", "APPLIANCE_REPAIR"];

export default function NewOrder() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    category: "PLUMBING",
    scheduledAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        address: form.address,
        category: form.category,
        scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
      };

      await api.post("/client/orders", payload);
      setMsg("Заказ создан.");
      setForm((p) => ({ ...p, title: "", description: "", address: "", scheduledAt: "" }));
    } catch (err) {
      setMsg(err?.response?.data?.message || "Ошибка создания заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "24px auto", padding: 16 }}>
      <h2>Сделать заказ</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="Заголовок" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Описание" required />
        <input name="address" value={form.address} onChange={onChange} placeholder="Адрес" required />

        <select name="category" value={form.category} onChange={onChange}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          type="datetime-local"
          name="scheduledAt"
          value={form.scheduledAt}
          onChange={onChange}
          placeholder="Когда нужно (необязательно)"
        />

        <button disabled={loading} type="submit">
          {loading ? "Создание..." : "Создать заказ"}
        </button>
      </form>

      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
}
