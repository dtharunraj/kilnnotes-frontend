import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BrandPanel from "./BrandPanel.jsx";
import Field from "./Field.jsx";

const API_URL = "https://dtharunraj-kilnnotes-backend.vercel.app/api/signup";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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

    if (!form.name.trim()) {
      errors.name = "Enter your name.";
    }

    if (!form.email.trim()) {
      errors.email = "Enter your email.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = "Enter a valid email.";
    }

    if (!form.password) {
      errors.password = "Enter a password.";
    } else if (form.password.length < 8) {
      errors.password = "Minimum 8 characters.";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Passwords don't match.";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");
    setSuccessMsg("");

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      await axios.post(API_URL, {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setSuccessMsg("Account created successfully.");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);
    } catch (err) {
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

      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-10 lg:w-[55%]">

        <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-[#c9a96e]/10 blur-[120px]" />

        <div className="relative z-10 w-full max-w-md">

          <div className="mb-8 lg:hidden">
            <span className="text-xl font-semibold tracking-[0.2em]">
              KILN
            </span>
          </div>

          <div className="mb-7">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
              Start your journey
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#f5f1e8]">
              Create your space.
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#8e8b84]">
              Build a private place for your thoughts, notes and ideas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

            {serverError && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </div>
            )}

            {successMsg && (
              <div className="mb-5 rounded-xl border border-[#d8bb82]/20 bg-[#d8bb82]/10 px-4 py-3 text-sm text-[#e4c98e]">
                {successMsg}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              <Field
                label="Full name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                error={fieldErrors.name}
                placeholder="Your name"
              />

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
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                error={fieldErrors.password}
                placeholder="Minimum 8 characters"
              />

              <Field
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                placeholder="Repeat your password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full rounded-xl bg-[#d8bb82] py-3.5 text-sm font-semibold text-[#11100e] transition-all duration-300 hover:bg-[#e5cc99] hover:shadow-[0_0_35px_rgba(216,187,130,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create your account"}
              </button>
            </form>

            <div className="my-6 h-px bg-white/[0.07]" />

            <p className="text-center text-sm text-[#77746e]">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-[#d8bb82] hover:text-[#f0d8a5]"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}