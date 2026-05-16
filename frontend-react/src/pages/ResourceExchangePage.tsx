import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatusBadge } from "../components/ui/StatusBadge";
import { RESOURCE_STOCK, RESOURCES } from "../data/mockData";
import { PAGE_SUBTITLES } from "../config/navigation";

export function ResourceExchangePage() {
  const inTransit = RESOURCES.filter((r) => r.status === "in-transit").length;
  const approved = RESOURCES.filter((r) => r.status === "approved").length;
  const pending = RESOURCES.filter((r) => r.status === "pending").length;

  return (
    <>
      <PageHeader title="Resource Exchange" subtitle={PAGE_SUBTITLES["/resource-exchange"]} />
      <div className="grid-3">
        {[
          { label: "In Transit", count: inTransit, color: "#818cf8" },
          { label: "Approved", count: approved, color: "#34d399" },
          { label: "Pending", count: pending, color: "#fbbf24" },
        ].map((s) => (
          <GlassCard key={s.label}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.count}</div>
            <div className="text-muted">{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <SectionTitle icon="📦" title="Live Resource Stock" />
      <div className="stock-grid" style={{ marginBottom: "1.5rem" }}>
        {RESOURCE_STOCK.map((s) => (
          <div key={s.item} className="stock-card">
            <StatusBadge status={s.status} />
            <div className="stock-card__value" style={{ marginTop: 8 }}>
              {s.level}
              {s.unit === "%" ? "%" : ` ${s.unit}`}
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{s.item}</div>
            <div className={`stock-card__trend stock-card__trend--${s.trend < 0 ? "down" : "up"}`}>
              Shortage forecast: {s.trend < 0 ? "declining" : "stable"}
            </div>
          </div>
        ))}
      </div>

      <GlassCard>
        <SectionTitle icon="🔄" title="Active Transfers" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>From</th>
                <th>To</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {RESOURCES.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.item}</strong></td>
                  <td>{r.from}</td>
                  <td>{r.to}</td>
                  <td style={{ color: "var(--accent-bright)", fontWeight: 700 }}>{r.qty}</td>
                  <td><StatusBadge status={r.status} label={r.status.replace("-", " ")} /></td>
                  <td>
                    <StatusBadge
                      status={r.urgent ? "critical" : "stable"}
                      label={r.urgent ? "Urgent" : "Normal"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}


