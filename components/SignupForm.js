"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { Button, Field } from "@/components/UI";
import { Eye } from "@/components/Icons";
import { validateRegister } from "@/lib/validators";
import { useAuth } from "@/context/AuthContext";

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const strengthLabel = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["bg-slate-200", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-green-600"];

export default function SignupForm() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Already signed in (or just signed up): go to the account page
  useEffect(() => {
    if (isAuthenticated) router.replace("/account");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const score = strength(values.password);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(values);
    if (values.confirm !== values.password) errs.confirm = "Passwords do not match.";
    if (!agree) errs.agree = "Please accept the terms to continue.";
    setErrors(errs);
    setApiError("");
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await register({ name: values.name, email: values.email, password: values.password });
    } catch (err) {
      setApiError(err.message || "Unable to sign up. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Ajrak Impex International"
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-maroon-700 hover:underline">Log in</Link></>}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Full name" id="name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} placeholder="Your full name" />
        <Field label="Email" id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} placeholder="you@company.com" />
        <div>
          <Field
            label="Password"
            id="password"
            error={errors.password}
          >
            {(input) => (
              <div className="relative">
                <input className={`${input} pr-11`} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={!!errors.password} value={values.password} onChange={onChange} placeholder="At least 8 characters" />
                <button type="button" onClick={() => setShowPassword((show) => !show)} aria-label={showPassword ? "Hide password" : "Show password"} aria-controls="password" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-maroon-700">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            )}
          </Field>
          {values.password && (
            <div className="mt-2 animate-fade-in">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${score >= n ? strengthColor[score] : "bg-slate-200"}`} />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-500">{strengthLabel[score]}</p>
            </div>
          )}
        </div>
        <Field
          label="Confirm password"
          id="confirm"
          error={errors.confirm}
        >
          {(input) => (
            <div className="relative">
              <input className={`${input} pr-11`} id="confirm" name="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" aria-invalid={!!errors.confirm} value={values.confirm} onChange={onChange} placeholder="Repeat password" />
              <button type="button" onClick={() => setShowConfirm((show) => !show)} aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"} aria-controls="confirm" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-maroon-700">
                <Eye className="h-5 w-5" />
              </button>
            </div>
          )}
        </Field>
        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-maroon-700" />
            I agree to the Terms of Service and Privacy Policy.
          </label>
          {errors.agree && <p className="mt-1 animate-fade-in text-xs text-red-600">{errors.agree}</p>}
        </div>
        {apiError && <p role="alert" className="animate-fade-up rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{apiError}</p>}
        <Button type="submit" disabled={loading} className="w-full">{loading ? "Creating account..." : "Sign up"}</Button>
      </form>
    </AuthLayout>
  );
}
