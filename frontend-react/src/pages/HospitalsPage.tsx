import { useEffect, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { LoadingState } from "../components/ui/LoadingState";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatusBadge } from "../components/ui/StatusBadge";
import { HOSPITALS, pct } from "../data/mockData";
import { fetchHospitals, type Hospital } from "../lib/api";
import { PAGE_SUBTITLES } from "../config/navigation";

export function HospitalsPage() {
  const [apiHospitals, setApiHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sel, setSel] = useState<number | string | null>(null);

  useEffect(() => {
    fetchHospitals()
      .then(setApiHospitals)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading hospitals…" />;
  if (error) return <p className="error-state">{error}</p>;

  const list =
    apiHospitals.length > 0
      ? apiHospitals.map((h) => ({
          id: h.id,
          name: h.name,
          region: h.city,
          beds: h.icu_beds_total * 10,
          occupied: Math.round((h.occupancy_percent / 100) * h.icu_beds_total * 10),
          icu: h.icu_beds_total,
          icuUsed: h.icu_beds_total - h.icu_beds_available,
          status:
            h.occupancy_percent >= 90
              ? "critical"
              : h.occupancy_percent >= 75
                ? "warning"
                : "stable",
        }))
      : HOSPITALS;

  const selected = list.find((h) => h.id === sel);

  return (
    <>
      <PageHeader title="Hospital Management" subtitle={PAGE_SUBTITLES["/hospitals"]} />
      <div className="grid-2" style={{ gridTemplateColumns: sel ? "1fr 340px" : "1fr" }}>
        <div>
          {list.map((h) => (
            <GlassCard
              key={h.id}
              hover
              className="hospital-list-item"
              style={{
                marginBottom: "0.85rem",
                cursor: "pointer",
                border:
                  sel === h.id ? "1px solid rgba(99,102,241,0.6)" : undefined,
                boxShadow: sel === h.id ? "0 0 24px var(--accent-glow)" : undefined,
              }}
              onClick={() => setSel(sel === h.id ? null : h.id)}
            >
              <div className="hospital-list-item__row">
                <div>
                  <strong>{h.name}</strong>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {h.region} Region
                  </div>
                </div>
                <StatusBadge status={h.status} />
              </div>
              <div className="grid-2" style={{ gap: "0.75rem", marginTop: "0.75rem" }}>
                <div>
                  <div className="text-muted" style={{ fontSize: "0.7rem", marginBottom: 4 }}>
                    Bed Occupancy
                  </div>
                  <ProgressBar value={h.occupied} max={h.beds} />
                  <small>
                    {h.occupied}/{h.beds} ({pct(h.occupied, h.beds)}%)
                  </small>
                </div>
                <div>
                  <div className="text-muted" style={{ fontSize: "0.7rem", marginBottom: 4 }}>
                    ICU Capacity
                  </div>
                  <ProgressBar value={h.icuUsed} max={h.icu} />
                  <small>
                    {h.icuUsed}/{h.icu} ({pct(h.icuUsed, h.icu)}%)
                  </small>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {selected && (
          <GlassCard>
            <div className="hospital-list-item__row">
              <div>
                <strong style={{ fontSize: "1rem" }}>{selected.name}</strong>
                <div className="text-muted">{selected.region} Region</div>
              </div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSel(null)}>
                ✕
              </button>
            </div>
            <StatusBadge status={selected.status} />
            <div style={{ marginTop: "1rem" }}>
              {[
                ["Total Beds", selected.beds],
                ["Occupied", selected.occupied],
                ["Available", selected.beds - selected.occupied],
                ["ICU Total", selected.icu],
                ["ICU Used", selected.icuUsed],
                ["ICU Free", selected.icu - selected.icuUsed],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid var(--glass-border)",
                    fontSize: "0.85rem",
                  }}
                >
                  <span className="text-muted">{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div className="text-muted" style={{ fontSize: "0.75rem", marginBottom: 6 }}>
                Bed Utilisation
              </div>
              <ProgressBar value={selected.occupied} max={selected.beds} />
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  marginTop: 8,
                  background: "linear-gradient(135deg,#fff,#818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {pct(selected.occupied, selected.beds)}%
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </>
  );
}



