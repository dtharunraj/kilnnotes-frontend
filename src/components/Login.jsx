import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BrandPanel from "./BrandPanel.jsx";
import Field from "./Field.jsx";

const API_URL = "https://dtharunraj-kilnnotes-backend.vercel.app/api/login";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const errors = {};

    if (!form.email.trim()) {
      errors.email = "Enter your email.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = "Enter a valid email.";
    }

    if (!form.password) {
      errors.password = "Enter your password.";
    } else if (form.password.length < 8) {
      errors.password = "Minimum 8 characters.";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      console.log("Login:", {
        email: form.email.trim(),
        password: form.password,
      });

      const { data } = await axios.post(API_URL, {
        email: form.email.trim(),
        password: form.password,
      });

      console.log("Backend response:", data);

      onSuccess(data);
    } catch (err) {
      console.log("Login error:", err);

      const message =
        err.response?.data?.message ||
        "Couldn't connect to the server.";

      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white lg:flex">

      <BrandPanel />

      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-12 lg:w-[55%]">

        <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-[#c9a96e]/10 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[350px] w-[350px] rounded-full bg-[#8c6a3f]/10 blur-[120px]" />

        <div className="relative z-10 w-full max-w-md">

          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c9a96e]/30 bg-[#c9a96e]/10">
                <span className="text-lg text-[#d8bb82]">K</span>
              </div>

              <span className="text-xl font-semibold tracking-[0.2em]">
                KILN
              </span>
            </div>
          </div>

          <div className="mb-9">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
              Private workspace
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#f5f1e8]">
              Welcome back.
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#8e8b84]">
              Sign in to continue to your private workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

            {serverError && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                error={fieldErrors.email}
                placeholder="you@example.com"
              />

              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                error={fieldErrors.password}
                placeholder="Enter your password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-[#d8bb82] py-3.5 text-sm font-semibold text-[#11100e] transition-all duration-300 hover:bg-[#e5cc99] hover:shadow-[0_0_35px_rgba(216,187,130,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Signing in..." : "Enter workspace"}
                </span>
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#66635e]">
                or
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <p className="text-center text-sm text-[#77746e]">
              New to Kiln?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#d8bb82] transition hover:text-[#f0d8a5]"
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-7 text-center text-[11px] text-[#4f4d49]">
            Your workspace. Your ideas. Your control.
          </p>

        </div>
      </main>
    </div>
  );
}