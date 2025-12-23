import { useState } from "react";
import { createReview } from "../api/reviews.api";

export default function ReviewForm({ orderId, onSuccess, onCancel }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createReview(orderId, { rating, text });
      onSuccess();
    } catch (e) {
      setError(e?.response?.data?.message || "Ошибка отправки отзыва");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        marginTop: 12,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      <h4>Оставить отзыв</h4>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ marginBottom: 8 }}>
        <label>Оценка: </label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Опишите впечатления о работе мастера"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        required
        style={{ width: "100%" }}
      />

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
}
