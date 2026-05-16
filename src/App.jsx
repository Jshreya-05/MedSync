import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import LoginPage from "./components/LoginPage";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import ResourceExchange from "./pages/ResourceExchange";
import EmergencyControl from "./pages/EmergencyControl";
import AmbulanceNetwork from "./pages/AmbulanceNetwork";
import AIPredictions from "./pages/AIPredictions";
import WaterQuality from "./pages/WaterQuality";
import IoTManagement from "./pages/IoTManagement";
import Settings from "./pages/Settings";

const NAV = [
  { id: "dashboard", label: "Dashboard",        icon: "📊" },
  { id: "hospitals", label: "Hospitals",         icon: "🏥" },
  { id: "resources", label: "Resource Exchange", icon: "🔄" },
  { id: "emergency", label: "Emergency Control", icon: "🚨" },
  { id: "ambulance", label: "Ambulance Network", icon: "🚑" },
  { id: "ai",        label: "AI Predictions",    icon: "🤖" },
  { id: "water",     label: "Water Quality",     icon: "💧" },
  { id: "iot",       label: "IoT Management",    icon: "📡" },
  { id: "settings",  label: "Settings",          icon: "⚙️" },
];

const PAGES = {
  dashboard: Dashboard,
  hospitals: Hospitals,
  resources: ResourceExchange,
  emergency: EmergencyControl,
  ambulance: AmbulanceNetwork,
  ai:        AIPredictions,
  water:     WaterQuality,
  iot:       IoTManagement,
  settings:  Settings,
};

export default function App() {
  const [session, setSession] = useState(null);
  const [page, setPage]       = useState("dashboard");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (!session) return <LoginPage onLogin={() => {}} />;

  const PageComponent = PAGES[page];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#faf8ff" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#2e3038", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "22px 18px 14px" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>🏥 HEMS AI</div>
          <div style={{ fontSize: 11, color: "#b2c5ff60", marginTop: 2 }}>Mission Control</div>
        </div>

        <nav style={{ flex: 1, padding: "0 8px" }}>
          {NAV.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 12px",
                borderRadius: 8, marginBottom: 2, border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "#003d9b" : "transparent",
                color: active ? "#fff" : "#b2c5ff",
                fontWeight: active ? 700 : 400, fontSize: 13,
              }}>
                <span style={{ fontSize: 15 }}>{n.icon}</span>
                {n.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "14px 18px", borderTop: "1px solid #ffffff15" }}>
          <div style={{ fontSize: 11, color: "#737685" }}>Logged in as</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#b2c5ff", marginBottom: 10 }}>
            {session?.user?.user_metadata?.full_name || session?.user?.email || "Dr. Admin"}
          </div>
          <button onClick={() => supabase.auth.signOut()} style={{
            width: "100%", padding: "7px", background: "#ba1a1a22", border: "1px solid #ba1a1a55",
            borderRadius: 8, color: "#ff8080", fontSize: 12, cursor: "pointer", fontWeight: 600,
          }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <PageComponent />
      </main>
    </div>
  );
}
