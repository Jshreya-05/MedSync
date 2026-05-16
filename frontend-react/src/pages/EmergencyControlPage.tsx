import { useEffect, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { KpiCard } from "../components/ui/KpiCard";
import { LoadingState } from "../components/ui/LoadingState";
import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FEED_ALERTS, HOSPITALS, statusColor } from "../data/mockData";
import { fetchAlerts, type Alert } from "../lib/api";
import { PAGE_SUBTITLES } from "../config/navigation";

export function EmergencyControlPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts()
      .then(setAlerts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading emergency feed…" />;
  if (error) return <p className="error-state">{error}</p>;

  const feed =
    alerts.length > 0
      ? alerts.map((a) => ({
          id: a.id,
          level: a.severity,
          msg: `${a.title} — ${a.message}`,
          time: new Date(a.created_at).toLocaleString(),
        }))
      : FEED_ALERTS;

  const critical = feed.filter((a) => a.level === "critical").length;
  const warning = feed.filter((a) => a.level === "warning").length;
  const info = feed.filter((a) => a.level === "info").length;

  return (
    <>
      <PageHeader title="Emergency Control" subtitle={PAGE_SUBTITLES["/emergency-control"]} />

      <div className="kpi-grid" style={{ maxWidth: 600 }}>
        <KpiCard label="Critical" value={critical} sub="Immediate action" icon="🚨" tone="critical" live />
        <KpiCard label="Warning" value={warning} sub="Monitor closely" icon="⚠" tone="warning" />
        <KpiCard label="Info" value={info} sub="Informational" icon="ℹ" />
      </div>

      <div className="grid-2">
        <GlassCard>
          <SectionTitle icon="🚨" title="Active Alerts" />
          <div className="alert-feed">
            {feed.map((a) => {
              const c = statusColor(a.level);
              return (
                <div
                  key={a.id}
                  className="alert-item"
                  style={{ background: c.bg, borderColor: c.dot }}
                >
                  <div className="alert-item__meta">
                    <span style={{ fontWeight: 800, fontSize: "0.65rem", color: c.dot }}>
                      {a.level.toUpperCase()}
                    </span>
                    <span>{a.time}</span>
                  </div>
                  <div className="alert-item__msg">{a.msg}</div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <div>
          <GlassCard style={{ marginBottom: "1rem" }}>
            <SectionTitle icon="🗺" title="Live Ambulance Tracking" />
            <div className="map-panel">
              <span className="map-panel__pin">🚑</span>
              <span className="map-panel__pin">🚑</span>
              <span className="map-panel__pin">🚑</span>
              <span className="map-panel__label">Fleet GPS · Realtime map Phase 4</span>
            </div>
          </GlassCard>

          <GlassCard>
            <SectionTitle icon="🏥" title="Nearby Hospital Coordination" />
            {HOSPITALS.slice(0, 3).map((h) => (
              <div
                key={h.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--glass-border)",
                  fontSize: "0.85rem",
                }}
              >
                <span>{h.name}</span>
                <span className="text-muted">{h.icu - h.icuUsed} ICU free</span>
                <button type="button" className="btn btn--sm btn--accent">
                  Request bed
                </button>
              </div>
            ))}
          </GlassCard>

          <div className="escalation-banner" style={{ marginTop: "1rem" }}>
            <strong>⚠ Emergency Protocol Active</strong>
            <p>
              ICU overflow risk at 2 sites. Escalation in progress. Resource reallocation authorised.
            </p>
            <button type="button" className="btn btn--danger" style={{ marginTop: "0.75rem", width: "100%" }}>
              Critical Escalation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


