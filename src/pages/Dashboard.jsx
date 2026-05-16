import { HOSPITALS, AMBULANCES, ALERTS, IOT_DEVICES } from "../data";
import { pct, sc } from "../helpers";
import { Card, Section, PageHeader, Badge, ProgressBar } from "../components/UI";

export default function Dashboard() {
  const totalBeds     = HOSPITALS.reduce((a, h) => a + h.beds, 0);
  const totalOccupied = HOSPITALS.reduce((a, h) => a + h.occupied, 0);
  const totalICU      = HOSPITALS.reduce((a, h) => a + h.icu, 0);
  const totalICUUsed  = HOSPITALS.reduce((a, h) => a + h.icuUsed, 0);

  const stats = [
    { label: "Connected Hospitals", value: HOSPITALS.length,                                      icon: "🏥", sub: "All nodes active"              },
    { label: "Bed Occupancy",        value: `${pct(totalOccupied, totalBeds)}%`,                   icon: "🛏️", sub: `${totalOccupied}/${totalBeds} beds`  },
    { label: "ICU Utilisation",      value: `${pct(totalICUUsed, totalICU)}%`,                    icon: "💊", sub: `${totalICUUsed}/${totalICU} beds` },
    { label: "Ambulances Active",    value: AMBULANCES.filter(a => a.status === "active").length,  icon: "🚑", sub: `${AMBULANCES.length} total fleet` },
    { label: "Critical Alerts",      value: ALERTS.filter(a => a.level === "critical").length,     icon: "🚨", sub: "Requires attention"               },
    { label: "Sensors Online",       value: IOT_DEVICES.filter(d => d.status === "online").length, icon: "📡", sub: `${IOT_DEVICES.length} total`      },
  ];

  return (
    <div>
      <PageHeader title="Mission Control Dashboard" sub="National Healthcare AI — live overview" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#003d9b" }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#191b23", marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "#737685" }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <Section icon="🏥" title="Hospital Status" />
          {HOSPITALS.map(h => (
            <div key={h.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{h.name}</span>
                <Badge status={h.status} />
              </div>
              <ProgressBar value={h.occupied} max={h.beds} />
              <div style={{ fontSize: 11, color: "#737685", marginTop: 3 }}>{h.occupied}/{h.beds} beds · ICU {h.icuUsed}/{h.icu}</div>
            </div>
          ))}
        </Card>

        <Card>
          <Section icon="🚨" title="Recent Alerts" />
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {ALERTS.map(a => {
              const c = sc(a.level);
              return (
                <div key={a.id} style={{ background: c.bg, borderRadius: 8, padding: "10px 14px", borderLeft: `4px solid ${c.dot}` }}>
                  <div style={{ fontSize: 13, color: c.text, fontWeight: 600 }}>{a.msg}</div>
                  <div style={{ fontSize: 11, color: "#737685", marginTop: 2 }}>{a.time}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
