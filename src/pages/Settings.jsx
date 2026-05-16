import { Card, PageHeader } from "../components/UI";

const ITEMS = [
  { title: "Notification Preferences", desc: "Configure alert thresholds and notification channels.", icon: "🔔" },
  { title: "User Management",          desc: "Add, edit or deactivate clinical staff accounts.",       icon: "👤" },
  { title: "Data Retention",           desc: "Set how long historical sensor and clinical data is stored.", icon: "🗃️" },
  { title: "IoT Device Configuration", desc: "Register new sensors and update ping intervals.",        icon: "📡" },
  { title: "AI Model Settings",        desc: "Tune prediction confidence thresholds and horizons.",    icon: "🤖" },
  { title: "System Integrations",      desc: "Connect to external EMR, lab and billing systems.",     icon: "🔗" },
];

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" sub="System configuration and preferences" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {ITEMS.map(s => (
          <Card key={s.title} style={{ cursor: "pointer" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#191b23", marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#737685", marginBottom: 12 }}>{s.desc}</div>
            <div style={{ fontSize: 13, color: "#003d9b", fontWeight: 600 }}>Configure →</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
