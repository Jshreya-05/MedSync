import { ALERTS } from "../data";
import { sc } from "../helpers";
import { Card, Section, PageHeader } from "../components/UI";

export default function EmergencyControl() {
  return (
    <div>
      <PageHeader title="Emergency Control" sub="Live emergency case management and response coordination" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <Section icon="🚨" title="Active Alerts" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ALERTS.map(a => {
              const c = sc(a.level);
              return (
                <div key={a.id} style={{ background: c.bg, borderRadius: 8, padding: "12px 14px", borderLeft: `4px solid ${c.dot}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: c.dot, letterSpacing: ".05em", marginBottom: 3 }}>{a.level.toUpperCase()}</div>
                    <div style={{ fontSize: 13, color: "#191b23" }}>{a.msg}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#737685", marginLeft: 12, whiteSpace: "nowrap" }}>{a.time}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Critical", count: ALERTS.filter(a => a.level === "critical").length, color: "#ba1a1a", sub: "Immediate action required" },
            { label: "Warning",  count: ALERTS.filter(a => a.level === "warning").length,  color: "#f59e0b", sub: "Monitor closely"           },
            { label: "Info",     count: ALERTS.filter(a => a.level === "info").length,     color: "#3b82f6", sub: "Informational only"         },
          ].map(r => (
            <Card key={r.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800, flexShrink: 0 }}>
                {r.count}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#191b23" }}>{r.label} Alerts</div>
                <div style={{ fontSize: 12, color: "#737685" }}>{r.sub}</div>
              </div>
            </Card>
          ))}

          <Card style={{ background: "#ffdad6", border: "1px solid #ba1a1a" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#ba1a1a", marginBottom: 4 }}>⚠ Emergency Protocol Active</div>
            <div style={{ fontSize: 12, color: "#7d0000" }}>ICU overflow risk at 2 sites. Escalation in progress. Resource reallocation authorised.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
