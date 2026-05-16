import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr]         = useState("");

  const handleAuth = async () => {
    if (!email || !password) { setErr("Fill all fields."); return; }
    setErr("");
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) { setErr(error.message); return; }
      onLogin();
    } else {
      if (!name) { setErr("Full name is required."); setLoading(false); return; }
      const { error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: name } },
      });
      setLoading(false);
      if (error) { setErr(error.message); return; }
      setErr("");
      alert("Account created! Please check your email to confirm, then sign in.");
      setIsLogin(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#faf8ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Left panel */}
      <div style={{ width: "45%", background: "#2e3038", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#003d9b55,#00000080)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 6, letterSpacing: -1 }}>🏥 HEMS AI</div>
          <div style={{ fontSize: 13, color: "#b2c5ff", marginBottom: 48 }}>National Healthcare AI Mission Control</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 16 }}>
            Secure coordination portal for emergency response
          </div>
          <p style={{ fontSize: 14, color: "#b2c5ff99", lineHeight: 1.7 }}>
            Real-time hospital monitoring, resource allocation, water quality and IoT sensor management — all in one platform.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#191b23", marginBottom: 6 }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ fontSize: 13, color: "#737685", marginBottom: 28 }}>
            {isLogin ? "Sign in to access Mission Control." : "Register a new clinical account."}
          </p>

          {err && (
            <div style={{ background: "#ffdad6", color: "#ba1a1a", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>
              {err}
            </div>
          )}

          {!isLogin && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} placeholder="Dr. Jane Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Clinical Email</label>
            <input style={inputStyle} type="email" placeholder="dr@hospital.gov" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button onClick={handleAuth} disabled={loading} style={btnStyle("#003d9b")}>
            {loading ? "Please wait..." : isLogin ? "Sign In →" : "Create Account →"}
          </button>

          <div style={{ margin: "20px 0", height: 1, background: "#e1e2ec" }} />

          <p style={{ fontSize: 13, color: "#737685", textAlign: "center" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => { setIsLogin(!isLogin); setErr(""); }}
              style={{ color: "#003d9b", fontWeight: 700, cursor: "pointer", marginLeft: 5 }}>
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>

          <p style={{ fontSize: 11, color: "#737685", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
            Authorized personnel only. Access is monitored under national healthcare data protocols.
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: 11, fontWeight: 700, color: "#737685",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em",
};

const inputStyle = {
  width: "100%", height: 46, padding: "0 14px", border: "1px solid #c3c6d6",
  borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box",
};

const btnStyle = (bg) => ({
  width: "100%", height: 46, background: bg, color: "#fff", border: "none",
  borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
});
