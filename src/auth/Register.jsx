import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation("auth");

  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get("role");
  const role = roleFromUrl === "TECHNICIAN" ? "TECHNICIAN" : "CLIENT";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  /* ===== VALIDATION ===== */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digit: /\d/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const isPasswordMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const canSubmit =
    emailValid &&
    isPasswordValid &&
    isPasswordMatch &&
    agree &&
    !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!canSubmit) return;

    setLoading(true);
    try {
      await register({ email, password, role });
      sessionStorage.setItem("verify_email", email);
      navigate("/auth/verify", { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || t("errors.register"));
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
          {role === "TECHNICIAN"
            ? t("titleTechnician")
            : t("titleClient")}
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-3 py-2 border rounded-lg ${
              email && !emailValid ? "border-red-500" : ""
            }`}
            required
          />
          {email && !emailValid && (
            <div className="text-sm text-red-600">
              {t("errors.email")}
            </div>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg"
            required
          />

          {/* PASSWORD RULES */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              password.length > 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2 space-y-1 text-base">
              <p className={passwordChecks.length ? "text-green-600" : "text-red-600"}>
                • {t("passwordRules.length")}
              </p>
              <p className={passwordChecks.lower ? "text-green-600" : "text-red-600"}>
                • {t("passwordRules.lower")}
              </p>
              <p className={passwordChecks.upper ? "text-green-600" : "text-red-600"}>
                • {t("passwordRules.upper")}
              </p>
              <p className={passwordChecks.digit ? "text-green-600" : "text-red-600"}>
                • {t("passwordRules.digit")}
              </p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder={t("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`px-3 py-2 border rounded-lg ${
              confirmPassword && !isPasswordMatch ? "border-red-500" : ""
            }`}
            required
          />
          {confirmPassword && !isPasswordMatch && (
            <div className="text-sm text-red-600">
              {t("errors.passwordMatch")}
            </div>
          )}

          {/* AGREEMENT */}
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1"
            />
            <span>
              {t("agree.prefix")}{" "}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="text-blue-600 hover:underline"
              >
                {t("agree.privacy")}
              </button>{" "}
              {t("agree.and")}{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-blue-600 hover:underline"
              >
                {t("agree.terms")}
              </button>
            </span>
          </label>

          {submitted && !agree && (
            <div className="text-sm text-red-600">
              {t("errors.agree")}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t("loading") : t("submit")}
          </button>
        </form>

        <div className="pt-6 mt-8 text-sm text-center text-gray-600 border-t">
          {t("already")}{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            {t("login")}
          </Link>
        </div>
      </div>

      {showPrivacy && (
        <Modal
          title={t("privacyTitle")}
          onClose={() => setShowPrivacy(false)}
        >
          <p className="text-sm text-gray-700">{t("privacyText")}</p>
        </Modal>
      )}

      {showTerms && (
        <Modal
          title={t("termsTitle")}
          onClose={() => setShowTerms(false)}
        >
          <p className="text-sm text-gray-700">{t("termsText")}</p>
        </Modal>
      )}
    </section>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto relative">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
