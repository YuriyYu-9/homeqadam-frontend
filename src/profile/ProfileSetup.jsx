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
    return <div style={{ padding: 40 }}>Загрузка профиля…</div>;
  }

  return (
    <section style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        {role === "TECHNICIAN" ? "Анкета специалиста" : "Профиль клиента"}
      </h1>

      <p style={{ marginBottom: 24, color: "#555" }}>
        {role === "TECHNICIAN"
          ? "Эти данные увидят клиенты при выборе специалиста."
          : "Эти данные нужны для связи по заказам."}
      </p>

      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input name="firstName" placeholder="Имя" value={form.firstName} onChange={onChange} required />
        <input name="lastName" placeholder="Фамилия" value={form.lastName} onChange={onChange} required />
        <input name="phone" placeholder="Телефон" value={form.phone} onChange={onChange} required />
        <input name="telegram" placeholder="Telegram (опционально)" value={form.telegram} onChange={onChange} />

        {role === "TECHNICIAN" && (
          <>
            <select name="specialty" value={form.specialty} onChange={onChange} required>
              <option value="">Выберите специальность</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
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
            />

            <textarea
              name="about"
              placeholder="Опишите ваш опыт и услуги"
              value={form.about}
              onChange={onChange}
              rows={5}
              required
            />

            <input
              name="avatarUrl"
              placeholder="Ссылка на фото (опционально)"
              value={form.avatarUrl}
              onChange={onChange}
            />
          </>
        )}

        <button type="submit" disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить профиль"}
        </button>
      </form>
    </section>
  );
};

export default ProfileSetup;
