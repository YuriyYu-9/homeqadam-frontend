import { useState } from "react";
import { verify } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("verify_email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return <div style={{ padding: 16 }}>Нет email для подтверждения. Вернись на регистрацию.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verify({ email, code });

      // ✅ очистим и перекинем на логин
      sessionStorage.removeItem("verify_email");
      navigate("/auth/login?verified=1", { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || "Неверный код подтверждения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Подтверждение Email</h2>
      <p>Код отправлен на: <b>{email}</b></p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Код подтверждения"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Проверка..." : "Подтвердить"}
        </button>
      </form>
    </div>
  );
}
