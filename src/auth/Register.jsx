import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

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

      sessionStorage.setItem("verify_email", email);
      navigate("/auth/verify", { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md px-4 py-16 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        Регистрация {role === "TECHNICIAN" ? "специалиста" : "клиента"}
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Пароль (минимум 6 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>

      {/* UX block */}
      <div className="pt-6 mt-8 text-sm text-center text-gray-600 border-t">
        <p>
          Уже есть аккаунт?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
