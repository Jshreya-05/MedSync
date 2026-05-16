import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatusBadge } from "../components/ui/StatusBadge";
import { IOT_DEVICES } from "../data/mockData";
import { PAGE_SUBTITLES } from "../config/navigation";

export function IoTManagementPage() {
  const online = IOT_DEVICES.filter((d) => d.status === "online").length;
  const warning = IOT_DEVICES.filter((d) => d.status === "warning").length;
  const offline = IOT_DEVICES.filter((d) => d.status === "offline").length;

  return (
    <>
      <PageHeader title="IoT Sensor Management" subtitle={PAGE_SUBTITLES["/iot-management"]} />
      <div className="grid-3">
        {[
          { label: "Online", count: online, color: "#34d399" },
          { label: "Warning", count: warning, color: "#fbbf24" },
          { label: "Offline", count: offline, color: "#f87171" },
        ].map((s) => (
          <GlassCard key={s.label}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.count}</div>
            <div className="text-muted">{s.label} Devices</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <SectionTitle icon="📡" title="Device List" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sensor ID</th>
                <th>Type</th>
                <th>Zone</th>
                <th>Battery</th>
                <th>Signal</th>
                <th>Last Ping</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {IOT_DEVICES.map((d) => (
                <tr key={d.id}>
                  <td className="mono-cell">{d.id}</td>
                  <td><strong>{d.type}</strong></td>
                  <td>{d.zone}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-bar" style={{ width: 48 }}>
                        <div
                          className={`progress-bar__fill progress-bar__fill--${d.battery < 25 ? "critical" : "normal"}`}
                          style={{ width: `${d.battery}%` }}
                        />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{d.battery}%</span>
                    </div>
                  </td>
                  <td>{d.signal}</td>
                  <td>{d.lastPing}</td>
                  <td><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}

