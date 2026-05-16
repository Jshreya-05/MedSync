import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatusBadge } from "../components/ui/StatusBadge";
import { WATER_SENSORS } from "../data/mockData";
import { PAGE_SUBTITLES } from "../config/navigation";

export function WaterQualityPage() {
  return (
    <>
      <PageHeader title="Water Quality Monitoring" subtitle={PAGE_SUBTITLES["/water-quality"]} />
      <div className="grid-2">
        {WATER_SENSORS.map((s) => (
          <GlassCard key={s.zone} style={{ borderLeft: `3px solid ${s.status === "warning" ? "#f59e0b" : "#22c55e"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <strong>{s.zone}</strong>
              <StatusBadge status={s.status} />
            </div>
            <div className="metric-grid">
              {[
                { label: "pH", value: s.ph, warn: s.ph < 6.9 || s.ph > 7.5 },
                { label: "BOD", value: s.bod, warn: s.bod > 4 },
                { label: "COD", value: s.cod, warn: s.cod > 15 },
                { label: "DO", value: s.do, warn: s.do < 6 },
                { label: "Turbidity", value: `${s.turbidity} NTU`, warn: s.turbidity > 1 },
                { label: "TDS", value: `${s.tds} mg/L`, warn: s.tds > 400 },
                { label: "Temp", value: `${s.temp}°C`, warn: s.temp > 25 },
                { label: "Contam.", value: s.contamIndex, warn: s.contamIndex > 0.5 },
              ].map((m) => (
                <div key={m.label} className={`metric-cell${m.warn ? " metric-cell--warn" : ""}`}>
                  <span>{m.label}</span>
                  <strong>{m.value}</strong>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <SectionTitle icon="⚠" title="AI Water Safety Alert" />
        <div className="escalation-banner" style={{ background: "rgba(245,158,11,0.12)", borderColor: "rgba(245,158,11,0.4)" }}>
          <strong style={{ color: "#fcd34d" }}>Contamination Risk — Hospital Zone B</strong>
          <p style={{ marginTop: 8 }}>
            Elevated turbidity (1.8 NTU) and contamination index (0.68). Disable Zone B supply and activate backup.
            Infection prevention protocol recommended.
          </p>
        </div>
      </GlassCard>
    </>
  );
}

