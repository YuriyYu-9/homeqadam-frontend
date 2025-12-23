import { useState } from "react";
import api from "../api/axios";

const categories = [
  { value: "PLUMBING", label: "Сантехника" },
  { value: "ELECTRICITY", label: "Электрика" },
  { value: "CLEANING", label: "Уборка" },
  { value: "APPLIANCE_REPAIR", label: "Ремонт техники" },
];

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

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        scheduledAt: form.scheduledAt
          ? new Date(form.scheduledAt).toISOString()
          : null,
      };

      await api.post("/client/orders", payload);
      setMsg("Заказ успешно создан");
      setForm({
        title: "",
        description: "",
        address: "",
        category: "PLUMBING",
        scheduledAt: "",
      });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Ошибка создания заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-start justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl px-4">
        <div className="p-8 border border-blue-100 bg-blue-50 rounded-2xl">
          <h1 className="mb-2 text-2xl font-bold">
            Создание нового заказа
          </h1>

          <p className="mb-6 text-gray-700">
            Опишите задачу как можно подробнее — это поможет специалистам
            быстрее откликнуться и предложить лучшие условия.
          </p>

          <form onSubmit={onSubmit} className="grid gap-5">
            {/* TITLE */}
            <div>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Краткий заголовок задачи"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Например: «Починить смеситель на кухне»
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Подробное описание задачи"
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Чем подробнее описание, тем точнее отклики специалистов
              </p>
            </div>

            {/* ADDRESS */}
            <div>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                placeholder="Адрес выполнения работы"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Укажите город, район или точный адрес
              </p>
            </div>

            {/* CATEGORY */}
            <div>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Выберите подходящую категорию услуги
              </p>
            </div>

            {/* DATE */}
            <div>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={form.scheduledAt}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Необязательно. Если не указано — мастер предложит время сам
              </p>
            </div>

            {/* SUBMIT */}
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Создание заказа..." : "Создать заказ"}
            </button>

            {msg && (
              <div className="mt-2 text-sm text-gray-700">
                {msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
