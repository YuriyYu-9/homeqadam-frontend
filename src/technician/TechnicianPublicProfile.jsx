import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicTechnician } from "../api/technicians.api";

const TechnicianPublicProfile = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await getPublicTechnician(id);
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.response?.status === 404
              ? "Мастер не найден"
              : "Ошибка загрузки профиля"
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
  }, [id]);

  if (loading) {
    return <div style={{ padding: 40 }}>Загрузка профиля…</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "red" }}>{error}</div>;
  }

  return (
    <section style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>
        {data.firstName} {data.lastName}
      </h1>

      <div style={{ color: "#555", marginBottom: 16 }}>
        Специализация: <b>{data.specialty}</b>
      </div>

      <div style={{ marginBottom: 16 }}>
        Опыт работы: <b>{data.experienceYears} лет</b>
      </div>

      {data.avatarUrl && (
        <div style={{ marginBottom: 16 }}>
          <img
            src={data.avatarUrl}
            alt="Фото мастера"
            style={{ maxWidth: 200, borderRadius: 8 }}
          />
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <h3>О специалисте</h3>
        <p style={{ whiteSpace: "pre-line", color: "#333" }}>{data.about}</p>
      </div>

      {data.telegram && (
        <div style={{ marginTop: 16 }}>
          <b>Telegram:</b>{" "}
          <a
            href={`https://t.me/${data.telegram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
          >
            {data.telegram}
          </a>
        </div>
      )}
    </section>
  );
};

export default TechnicianPublicProfile;
