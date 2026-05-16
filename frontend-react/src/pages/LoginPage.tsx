import { useState } from "react";
import { APP_NAME } from "../config/navigation";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type LoginPageProps = {
  onDemoLogin: () => void;
};

type AuthTab = "login" | "signup";
type Toast = { message: string; type: "error" | "success" | "info" };

export function LoginPage({ onDemoLogin }: LoginPageProps) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [demoForm, setDemoForm] = useState({ id: "", email: "", password: "" });

  const showToast = (message: string, type: Toast["type"] = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSignup = async () => {
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirm) {
      showToast("Fill all fields", "error");
      return;
    }
    if (signupData.password !== signupData.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (!supabase) {
      showToast("Supabase is not configured", "error");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: { data: { full_name: signupData.name } },
    });
    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }
    showToast("Account created — check your email if confirmation is enabled", "success");
    setTab("login");
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      showToast("Fill all fields", "error");
      return;
    }
    if (!supabase) {
      showToast("Supabase is not configured", "error");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }
    showToast("Login successful", "success");
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.id.trim() || !demoForm.email.trim() || !demoForm.password.trim()) {
      showToast("All fields are required.", "error");
      return;
    }
    onDemoLogin();
  };

  return (
    <div className="login-page">
      {toast && (
        <div className={`login-toast login-toast--${toast.type}`} role="alert">
          {toast.message}
        </div>
      )}

      <div className="login-page__hero">
        <div className="login-page__hero-inner">
          <div className="login-brand">
            <span className="login-brand__icon">🏥</span>
            <div>
              <h1>{APP_NAME}</h1>
              <p>Healthcare Mission Control</p>
            </div>
          </div>
          <h2>Secure coordination for emergency response</h2>
          <p>
            Real-time hospital monitoring, resource allocation, water quality, and IoT sensor
            management — unified in one platform.
          </p>
        </div>
      </div>

      <div className="login-page__form-wrap">
        <div className="login-form">
          {isSupabaseConfigured ? (
            <>
              <h2>Clinical Portal</h2>
              <p className="login-form__subtitle">
                Sign in or create an account to access Mission Control.
              </p>

              <div className="login-tabs">
                <button
                  type="button"
                  className={`login-tabs__btn${tab === "login" ? " login-tabs__btn--active" : ""}`}
                  onClick={() => setTab("login")}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`login-tabs__btn${tab === "signup" ? " login-tabs__btn--active" : ""}`}
                  onClick={() => setTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              {tab === "login" ? (
                <>
                  <label className="login-field">
                    <span className="login-field__label">Clinical Email</span>
                    <input
                      className="login-field__input"
                      type="email"
                      placeholder="dr@hospital.gov"
                      autoComplete="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </label>
                  <label className="login-field">
                    <span className="login-field__label">Password</span>
                    <input
                      className="login-field__input"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn--primary btn--login"
                    disabled={loading}
                    onClick={handleLogin}
                  >
                    {loading ? "Signing in…" : "Sign In →"}
                  </button>
                </>
              ) : (
                <>
                  <label className="login-field">
                    <span className="login-field__label">Full Name</span>
                    <input
                      className="login-field__input"
                      type="text"
                      placeholder="Dr. Jane Smith"
                      autoComplete="name"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                    />
                  </label>
                  <label className="login-field">
                    <span className="login-field__label">Email</span>
                    <input
                      className="login-field__input"
                      type="email"
                      placeholder="dr@hospital.gov"
                      autoComplete="email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                    />
                  </label>
                  <label className="login-field">
                    <span className="login-field__label">Password</span>
                    <input
                      className="login-field__input"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                    />
                  </label>
                  <label className="login-field">
                    <span className="login-field__label">Confirm Password</span>
                    <input
                      className="login-field__input"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={signupData.confirm}
                      onChange={(e) =>
                        setSignupData({ ...signupData, confirm: e.target.value })
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn--primary btn--login"
                    disabled={loading}
                    onClick={handleSignup}
                  >
                    {loading ? "Creating account…" : "Create Account →"}
                  </button>
                </>
              )}
            </>
          ) : (
            <form onSubmit={handleDemoSubmit} noValidate>
              <h2>Clinical Portal Login</h2>
              <p className="login-form__subtitle">
                Enter credentials to access Mission Control. (Demo mode — add Supabase keys in
                .env for real auth.)
              </p>
              <label className="login-field">
                <span className="login-field__label">Hospital ID</span>
                <input
                  className="login-field__input"
                  placeholder="HOSP-XXXX-XX"
                  value={demoForm.id}
                  onChange={(e) => setDemoForm({ ...demoForm, id: e.target.value })}
                />
              </label>
              <label className="login-field">
                <span className="login-field__label">Clinical Email</span>
                <input
                  className="login-field__input"
                  type="email"
                  placeholder="dr@hospital.gov"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                />
              </label>
              <label className="login-field">
                <span className="login-field__label">Password</span>
                <input
                  className="login-field__input"
                  type="password"
                  placeholder="••••••••"
                  value={demoForm.password}
                  onChange={(e) => setDemoForm({ ...demoForm, password: e.target.value })}
                />
              </label>
              <button type="submit" className="btn btn--primary btn--login">
                Login to Mission Control →
              </button>
            </form>
          )}

          <div className="login-divider" />
          <button type="button" className="btn btn--emergency" onClick={onDemoLogin}>
            Emergency Access
          </button>
          <p className="login-disclaimer">
            Authorized personnel only. Access monitored under healthcare data protocols.
          </p>
        </div>
      </div>
    </div>
  );
}

