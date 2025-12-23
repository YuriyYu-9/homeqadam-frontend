import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuth } from "../store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit = emailValid && password.length > 0 && !loading;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      const res = await login({ email, password });
      loginWithToken(res.accessToken);
      navigate("/app", { replace: true });
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-2 bg-gray-50 sm:px-4">
      <div
        className="
          w-full
          max-w-lg
          bg-blue-50
          border border-blue-100
          rounded-none sm:rounded-2xl
          shadow-none sm:shadow-md
          p-6 sm:p-8
          min-h-[calc(100vh-1rem)] sm:min-h-0
          flex flex-col justify-center
        "
      >
        <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
          Вход в аккаунт
        </h1>

        {error && (
          <div className="mb-4 text-sm text-center text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="grid gap-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-3 py-2 border rounded-lg ${
              submitted && !emailValid ? "border-red-500" : ""
            }`}
            required
          />
          {submitted && !emailValid && (
            <div className="text-sm text-red-600">
              Введите корректный email
            </div>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`px-3 py-2 border rounded-lg ${
              submitted && password.length === 0 ? "border-red-500" : ""
            }`}
            required
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg  hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        {/* REGISTER LINKS */}
        <div className="pt-6 mt-8 text-sm text-center text-gray-600 border-t">
          <p className="mb-3">Ещё нет аккаунта?</p>

          <div className="flex flex-col gap-2">
            <Link
              to="/auth/register"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Зарегистрироваться как клиент
            </Link>

            <Link
              to="/auth/register?role=TECHNICIAN"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Стать специалистом
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
