import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatusBadge } from "../components/ui/StatusBadge";
import { AMBULANCES } from "../data/mockData";
import { PAGE_SUBTITLES } from "../config/navigation";

export function AmbulanceNetworkPage() {
  return (
    <>
      <PageHeader title="Ambulance Network" subtitle={PAGE_SUBTITLES["/ambulance-network"]} />
      <div className="grid-3">
        {[
          { label: "Active", count: AMBULANCES.filter((a) => a.status === "active").length, color: "#34d399" },
          { label: "Standby", count: AMBULANCES.filter((a) => a.status === "standby").length, color: "#818cf8" },
          { label: "Returning", count: AMBULANCES.filter((a) => a.status === "returning").length, color: "#fbbf24" },
        ].map((s) => (
          <GlassCard key={s.label}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.count}</div>
            <div className="text-muted">{s.label}</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <SectionTitle icon="🚑" title="Fleet Status" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Status</th>
                <th>Location</th>
                <th>ETA</th>
                <th>Crew</th>
                <th>Load</th>
              </tr>
            </thead>
            <tbody>
              {AMBULANCES.map((a) => (
                <tr key={a.id}>
                  <td className="mono-cell">{a.id}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>{a.location}</td>
                  <td><strong>{a.eta}</strong></td>
                  <td>{a.crew}</td>
                  <td>{a.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}


