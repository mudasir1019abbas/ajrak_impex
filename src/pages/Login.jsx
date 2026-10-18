import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import { Button, Field } from "../components/UI.jsx";
import { Eye } from "../components/Icons.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/account";

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Enter a valid email address.";
    if (values.password.length < 6) errs.password = "Password must be at least 6 characters.";
    setErrors(errs);
    setApiError("");
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setApiError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Ajrak Impex account"
      footer={<>New here? <Link to="/signup" className="font-semibold text-maroon-700 hover:underline">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Email" id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} placeholder="you@company.com" />
        <div className="relative">
          <Field label="Password" id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" value={values.password} onChange={onChange} error={errors.password} placeholder="Your password" />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-8 text-slate-400 transition hover:text-maroon-700">
            <Eye className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-maroon-700" /> Remember me
          </label>
          <a href="#" className="font-medium text-maroon-700 hover:underline">Forgot password?</a>
        </div>
        {apiError && <p role="alert" className="animate-fade-up rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{apiError}</p>}
        <Button type="submit" disabled={loading} className="w-full">{loading ? "Logging in..." : "Log in"}</Button>
      </form>
    </AuthLayout>
  );
}
