import { AMBULANCES } from "../data";
import { Card, Section, PageHeader, Badge, TH, TD } from "../components/UI";

export default function AmbulanceNetwork() {
  return (
    <div>
      <PageHeader title="Ambulance Network" sub="Fleet tracking and dispatch coordination" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Active",    count: AMBULANCES.filter(a => a.status === "active").length,    color: "#22c55e" },
          { label: "Standby",   count: AMBULANCES.filter(a => a.status === "standby").length,   color: "#3b82f6" },
          { label: "Returning", count: AMBULANCES.filter(a => a.status === "returning").length, color: "#f59e0b" },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 13, color: "#737685" }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Section icon="🚑" title="Fleet Status" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f3fd" }}>
                {["Unit ID", "Status", "Location", "ETA", "Crew", "Load"].map(h => <TH key={h}>{h}</TH>)}
              </tr>
            </thead>
            <tbody>
              {AMBULANCES.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #f3f3fd" }}>
                  <TD blue>{a.id}</TD>
                  <td style={{ padding: "11px 14px" }}><Badge status={a.status} /></td>
                  <TD>{a.location}</TD>
                  <TD bold>{a.eta}</TD>
                  <TD>{a.crew}</TD>
                  <TD>{a.load}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
