import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, me } from "../api/auth.api";
import { useAuth } from "../store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ⬅️ login() УЖЕ возвращает data
      const data = await login({ email, password });

      console.log("LOGIN RESPONSE DATA:", data);

      const token = data?.accessToken;

      if (!token) {
        throw new Error("Backend не вернул accessToken");
      }

      loginWithToken(token);

      const meRes = await me();
      const role = meRes.role || meRes.data?.role;

      if (role === "CLIENT") {
        navigate("/client", { replace: true });
      } else if (role === "TECHNICIAN") {
        navigate("/technician", { replace: true });
      } else {
        throw new Error("Неизвестная роль пользователя");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Ошибка авторизации"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Вход</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        <span>Нет аккаунта? </span>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>

      <div style={{ marginTop: 10 }}>
        <Link to="/auth/register?role=TECHNICIAN">
          Войти / зарегистрироваться как специалист
        </Link>
      </div>
    </div>
  );
};

export default Login;
