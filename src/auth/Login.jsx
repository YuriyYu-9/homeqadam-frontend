import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuth } from "../store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(form);
      loginWithToken(res.accessToken);

      // дальше решает AppEntry
      navigate("/app", { replace: true });
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md px-4 py-16 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Вход</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={submit} className="grid gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          className="px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={onChange}
          required
          className="px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      {/* UX block */}
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
    </section>
  );
};

export default Login;
