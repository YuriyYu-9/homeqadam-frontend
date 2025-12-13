import { useState } from "react";
import { verify } from "../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return <div>Нет email для подтверждения</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verify({ email, code });
      navigate("/auth/login", { replace: true });
    } catch {
      alert("Неверный код подтверждения");
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
