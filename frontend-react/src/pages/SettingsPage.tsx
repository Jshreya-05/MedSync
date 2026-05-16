import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { PAGE_SUBTITLES } from "../config/navigation";
import { APP_NAME } from "../config/navigation";

const ITEMS = [
  { title: "Notification Preferences", desc: "Configure alert thresholds and notification channels.", icon: "🔔" },
  { title: "User Management", desc: "Add, edit or deactivate clinical staff accounts.", icon: "👤" },
  { title: "Data Retention", desc: "Set how long historical sensor and clinical data is stored.", icon: "🗃" },
  { title: "IoT Device Configuration", desc: "Register new sensors and update ping intervals.", icon: "📡" },
  { title: "AI Model Settings", desc: "Tune prediction confidence thresholds and horizons.", icon: "◎" },
  { title: "System Integrations", desc: "Connect to external EMR, lab and billing systems.", icon: "🔗" },
];

export function SettingsPage() {
  return (
    <>
      <PageHeader title="System Settings" subtitle={PAGE_SUBTITLES["/settings"]} />
      <div className="settings-grid">
        {ITEMS.map((s) => (
          <GlassCard key={s.title} hover style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "1.75rem" }}>{s.icon}</span>
            <h3 style={{ margin: "0.75rem 0 0.35rem", fontSize: "0.95rem" }}>{s.title}</h3>
            <p className="text-muted" style={{ fontSize: "0.85rem", margin: "0 0 1rem", lineHeight: 1.5 }}>
              {s.desc}
            </p>
            <span className="link-muted">Configure →</span>
          </GlassCard>
        ))}
        <GlassCard>
          <h3 style={{ margin: "0 0 1rem", fontSize: "0.95rem" }}>Organization</h3>
          <label className="field">
            <span>System name</span>
            <input type="text" defaultValue={APP_NAME} readOnly />
          </label>
          <label className="field">
            <span>Backend URL</span>
            <input type="text" placeholder="http://127.0.0.1:8000" />
          </label>
          <p className="page-hint">Supabase connection — Phase 3</p>
        </GlassCard>
      </div>
    </>
  );
}

