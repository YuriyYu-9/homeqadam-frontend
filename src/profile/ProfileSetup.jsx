import { useEffect, useState } from "react";
import { profileMe, profileUpsert } from "../api/profile.api";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

const SPECIALTIES = [
  "ELECTRICITY",
  "PLUMBING",
  "CLEANING",
  "APPLIANCE_REPAIR",
];

const ProfileSetup = () => {
  const { role, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    telegram: "",
    avatarUrl: "",
    specialty: "",
    experienceYears: "",
    about: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const p = await profileMe();

        setForm({
          firstName: p?.firstName || "",
          lastName: p?.lastName || "",
          phone: p?.phone || "",
          telegram: p?.telegram || "",
          avatarUrl: p?.avatarUrl || "",
          specialty: p?.specialty || "",
          experienceYears: p?.experienceYears ?? "",
          about: p?.about || "",
        });
      } catch {
        setError("Не удалось загрузить профиль");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        telegram: form.telegram || null,
        avatarUrl: role === "TECHNICIAN" ? form.avatarUrl || null : null,
      };

      if (role === "TECHNICIAN") {
        payload.specialty = form.specialty;
        payload.experienceYears = Number(form.experienceYears);
        payload.about = form.about;
      }

      await profileUpsert(payload);
      await refreshProfile();
      navigate("/app", { replace: true });
    } catch (e) {
      setError(e?.response?.data?.message || "Ошибка сохранения профиля");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-gray-600">Загрузка профиля…</div>;
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-2xl p-6 mx-auto border border-blue-100 shadow-sm bg-blue-50 rounded-2xl sm:p-8">
        <h1 className="mb-2 text-3xl font-bold">
          {role === "TECHNICIAN" ? "Анкета специалиста" : "Профиль клиента"}
        </h1>

        <p className="mb-6 text-gray-600">
          {role === "TECHNICIAN"
            ? "Эта информация будет видна клиентам при выборе специалиста."
            : "Эти данные используются для связи по вашим заказам."}
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="grid gap-8">
          {/* 🔹 Общая информация */}
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Основные данные</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="firstName"
                placeholder="Имя"
                value={form.firstName}
                onChange={onChange}
                required
                className="px-4 py-2 border rounded-lg"
              />

              <input
                name="lastName"
                placeholder="Фамилия"
                value={form.lastName}
                onChange={onChange}
                required
                className="px-4 py-2 border rounded-lg"
              />
            </div>

            <input
              name="phone"
              placeholder="Телефон для связи"
              value={form.phone}
              onChange={onChange}
              required
              className="px-4 py-2 border rounded-lg"
            />

            <input
              name="telegram"
              placeholder="Telegram (необязательно)"
              value={form.telegram}
              onChange={onChange}
              className="px-4 py-2 border rounded-lg"
           >
            </input>
          </div>

          {/* 🔹 Блок специалиста */}
          {role === "TECHNICIAN" && (
            <div className="grid gap-4 pt-6 border-t">
              <h2 className="text-lg font-semibold">Профессиональная информация</h2>

              <select
                name="specialty"
                value={form.specialty}
                onChange={onChange}
                required
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Выберите специальность</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="experienceYears"
                min="0"
                max="80"
                placeholder="Опыт работы (лет)"
                value={form.experienceYears}
                onChange={onChange}
                required
                className="px-4 py-2 border rounded-lg"
              />

              <textarea
                name="about"
                placeholder="Кратко опишите ваш опыт, навыки и услуги"
                value={form.about}
                onChange={onChange}
                rows={5}
                required
                className="px-4 py-2 border rounded-lg resize-none"
              />

              <input
                name="avatarUrl"
                placeholder="Ссылка на фото (необязательно)"
                value={form.avatarUrl}
                onChange={onChange}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Сохранение..." : "Сохранить профиль"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileSetup;
