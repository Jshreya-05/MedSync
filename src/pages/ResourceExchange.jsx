import { RESOURCES } from "../data";
import { Card, Section, PageHeader, Badge, TH, TD } from "../components/UI";

export default function ResourceExchange() {
  return (
    <div>
      <PageHeader title="Resource Exchange" sub="Track and manage inter-hospital resource transfers" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "In Transit", count: RESOURCES.filter(r => r.status === "in-transit").length, color: "#3b82f6" },
          { label: "Approved",   count: RESOURCES.filter(r => r.status === "approved").length,   color: "#22c55e" },
          { label: "Pending",    count: RESOURCES.filter(r => r.status === "pending").length,    color: "#f59e0b" },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 13, color: "#737685" }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Section icon="🔄" title="Active Transfers" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f3fd" }}>
                {["Item", "From", "To", "Qty", "Status", "Priority"].map(h => <TH key={h}>{h}</TH>)}
              </tr>
            </thead>
            <tbody>
              {RESOURCES.map(r => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f3f3fd" }}>
                  <TD bold>{r.item}</TD>
                  <TD>{r.from}</TD>
                  <TD>{r.to}</TD>
                  <TD blue>{r.qty}</TD>
                  <td style={{ padding: "11px 14px" }}><Badge status={r.status} label={r.status.replace("-", " ")} /></td>
                  <td style={{ padding: "11px 14px" }}>{r.urgent ? <Badge status="critical" label="Urgent" /> : <Badge status="stable" label="Normal" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
