import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Register() {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get("role");

  const role = roleFromUrl === "TECHNICIAN" ? "TECHNICIAN" : "CLIENT";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register({ email, password, role });

      navigate("/auth/verify", {
        state: { email },
        replace: true,
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Ошибка регистрации"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>
        Регистрация {role === "TECHNICIAN" ? "специалиста" : "клиента"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
