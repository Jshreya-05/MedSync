import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatusBadge } from "../components/ui/StatusBadge";
import { AI_PREDICTIONS, statusColor } from "../data/mockData";
import { PAGE_SUBTITLES } from "../config/navigation";

export function AIPredictionsPage() {
  return (
    <>
      <PageHeader title="AI Predictive Analytics" subtitle={PAGE_SUBTITLES["/ai-predictions"]} />
      <div className="prediction-grid">
        {AI_PREDICTIONS.map((p) => {
          const c = statusColor(p.risk);
          return (
            <GlassCard key={p.label} hover>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: "1.1rem" }}>◎</span>
                <strong>{p.label}</strong>
                <StatusBadge status={p.risk} label={`${p.risk} risk`} />
              </div>
              <p className="text-muted" style={{ fontSize: "0.85rem", margin: "0 0 12px" }}>
                📍 {p.site} · ⏱ {p.horizon}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={p.confidence} max={100} />
                </div>
                <span style={{ fontWeight: 800, color: c.dot, width: 48, textAlign: "right" }}>
                  {p.confidence}%
                </span>
              </div>
              <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                AI confidence · Disease & capacity forecasting
              </span>
            </GlassCard>
          );
        })}
      </div>
    </>
  );
}

