import { IOT_DEVICES } from "../data";
import { Card, Section, PageHeader, Badge, TH, TD } from "../components/UI";

export default function IoTManagement() {
  return (
    <div>
      <PageHeader title="IoT Sensor Management" sub="Connected devices, health status and analytics" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Online",  count: IOT_DEVICES.filter(d => d.status === "online").length,  color: "#22c55e" },
          { label: "Warning", count: IOT_DEVICES.filter(d => d.status === "warning").length, color: "#f59e0b" },
          { label: "Offline", count: IOT_DEVICES.filter(d => d.status === "offline").length, color: "#ba1a1a" },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 13, color: "#737685" }}>{s.label} Devices</div>
          </Card>
        ))}
      </div>
      <Card>
        <Section icon="📡" title="Device List" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f3fd" }}>
                {["Sensor ID", "Type", "Zone", "Battery", "Signal", "Last Ping", "Status"].map(h => <TH key={h}>{h}</TH>)}
              </tr>
            </thead>
            <tbody>
              {IOT_DEVICES.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f3f3fd" }}>
                  <TD blue>{d.id}</TD>
                  <TD bold>{d.type}</TD>
                  <TD>{d.zone}</TD>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 38, background: "#e1e2ec", borderRadius: 4, height: 7, overflow: "hidden" }}>
                        <div style={{ width: `${d.battery}%`, height: "100%", background: d.battery < 25 ? "#ba1a1a" : "#22c55e" }} />
                      </div>
                      <span style={{ fontSize: 12, color: d.battery < 25 ? "#ba1a1a" : "#191b23", fontWeight: 700 }}>{d.battery}%</span>
                    </div>
                  </td>
                  <TD>{d.signal}</TD>
                  <TD>{d.lastPing}</TD>
                  <td style={{ padding: "11px 14px" }}><Badge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
