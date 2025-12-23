import { useState } from "react";
import { verify } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("verify_email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!email) {
    return (
      <section className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="w-full max-w-md p-6 text-center border border-blue-100 bg-blue-50 rounded-2xl">
          <h2 className="mb-4 text-xl font-semibold">
            Нет данных для подтверждения
          </h2>
          <p className="mb-6 text-gray-600">
            Пожалуйста, начните регистрацию заново.
          </p>
          <Link
            to="/auth/register"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Перейти к регистрации
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    if (!code.trim()) return;

    setLoading(true);
    try {
      await verify({ email, code });
      sessionStorage.removeItem("verify_email");
      navigate("/auth/login?verified=1", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Неверный код подтверждения");
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
        <h1 className="mb-4 text-2xl font-bold text-center sm:text-3xl">
          Подтверждение Email
        </h1>

        <p className="mb-6 text-center text-gray-700">
          Код отправлен на <br />
          <span className="font-semibold">{email}</span>
        </p>

        {error && (
          <div className="mb-4 text-sm text-center text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Код подтверждения"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-center tracking-widest ${
              submitted && !code.trim() ? "border-red-500" : ""
            }`}
            required
          />

          {submitted && !code.trim() && (
            <div className="text-sm text-center text-red-600">
              Введите код из письма
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg  hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Проверка..." : "Подтвердить"}
          </button>
        </form>

        <div className="pt-6 mt-8 text-sm text-center text-gray-600 border-t">
          Не пришёл код?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Попробовать снова
          </Link>
        </div>
      </div>
    </section>
  );
}
