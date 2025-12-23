import { useEffect, useState } from "react";
import { getReviewsByTechnician } from "../api/reviews.api";

export default function TechnicianReviews({ technicianId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!technicianId) return;

    let cancelled = false;

    const load = async () => {
      try {
        const data = await getReviewsByTechnician(technicianId);
        if (!cancelled) {
          setReviews(data || []);
        }
      } catch {
        if (!cancelled) {
          setError("Ошибка загрузки отзывов");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [technicianId]);

  if (loading) {
    return <div style={{ marginTop: 24 }}>Загрузка отзывов…</div>;
  }

  if (error) {
    return (
      <div style={{ marginTop: 24, color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Отзывы</h3>

      {reviews.length === 0 && (
        <div style={{ color: "#777", marginTop: 8 }}>
          Пока нет отзывов.
        </div>
      )}

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              background: "#fafafa",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {r.clientFirstName} {r.clientLastName}
            </div>

            <div style={{ margin: "4px 0" }}>
              Оценка: ⭐ {r.rating}
            </div>

            <div style={{ color: "#555" }}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
