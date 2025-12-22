import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPublicTechnicians } from "../api/technicians.api";

const TechniciansList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await listPublicTechnicians();
        if (!cancelled) setItems(res || []);
      } catch (e) {
        if (!cancelled) {
          setMsg(e?.response?.data?.message || "Ошибка загрузки списка мастеров");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Загрузка…</div>;
  if (msg) return <div style={{ padding: 40, color: "red" }}>{msg}</div>;

  return (
    <section style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Специалисты</h1>

      {items.length === 0 && (
        <div>Пока нет доступных анкет мастеров.</div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((t) => (
          <div
            key={t.userId}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 18 }}>
                <b>{t.firstName} {t.lastName}</b>
              </div>

              <div style={{ color: "#555", marginTop: 4 }}>
                {t.specialty} · опыт: <b>{t.experienceYears}</b> лет
              </div>

              {t.telegram && (
                <div style={{ marginTop: 6 }}>
                  Telegram:{" "}
                  <a
                    href={`https://t.me/${t.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.telegram}
                  </a>
                </div>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {t.avatarUrl && (
                <img
                  src={t.avatarUrl}
                  alt="avatar"
                  style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }}
                />
              )}

              <Link to={`/technicians/${t.userId}`}>Открыть профиль</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechniciansList;
