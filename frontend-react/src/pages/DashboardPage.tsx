import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { KpiCard } from "../components/ui/KpiCard";
import { LineChart } from "../components/ui/LineChart";
import { LoadingState } from "../components/ui/LoadingState";
import { ProgressBar } from "../components/ui/ProgressBar";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  AI_PREDICTIONS,
  AMBULANCES,
  EMERGENCY_TREND,
  FEED_ALERTS,
  HOSPITALS,
  ICU_TREND,
  IOT_DEVICES,
  MEDICINE_TREND,
  QUICK_ACTIONS,
  RESOURCE_STOCK,
  pct,
  statusColor,
} from "../data/mockData";
import { fetchAlerts, fetchHospitals, type Alert, type Hospital } from "../lib/api";

const ESCALATION: Record<string, string> = {
  critical: "Initiate ICU overflow protocol · Alert nearest hospitals",
  warning: "Monitor closely · Prepare resource transfer",
  info: "Log for review · No immediate action",
};

export function DashboardPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiOffline, setApiOffline] = useState(false);

  useEffect(() => {
    Promise.all([fetchHospitals(), fetchAlerts()])
      .then(([h, a]) => {
        setHospitals(h);
        setAlerts(a);
        setApiOffline(false);
      })
      .catch(() => setApiOffline(true))
      .finally(() => setLoading(false));
  }, []);

  const totalBeds = HOSPITALS.reduce((a, h) => a + h.beds, 0);
  const totalOccupied = HOSPITALS.reduce((a, h) => a + h.occupied, 0);
  const totalIcu = HOSPITALS.reduce((a, h) => a + h.icu, 0);
  const totalIcuUsed = HOSPITALS.reduce((a, h) => a + h.icuUsed, 0);
  const criticalFeed = FEED_ALERTS.filter((a) => a.level === "critical").length;
  const criticalApi = alerts.filter((a) => a.severity === "critical").length;
  const criticalCount = criticalApi || criticalFeed;
  const avgOccupancy =
    hospitals.length > 0
      ? hospitals.reduce((s, h) => s + h.occupancy_percent, 0) / hospitals.length
      : pct(totalIcuUsed, totalIcu);
  const icuFree =
    hospitals.length > 0
      ? hospitals.reduce((s, h) => s + h.icu_beds_available, 0)
      : totalIcu - totalIcuUsed;

  if (loading) return <LoadingState message="Syncing mission control…" />;

  const displayHospitals =
    hospitals.length > 0
      ? hospitals.map((h) => ({
          id: h.id,
          name: h.name,
          occupied: h.icu_beds_total - h.icu_beds_available,
          beds: h.icu_beds_total,
          status:
            h.occupancy_percent >= 90
              ? "critical"
              : h.occupancy_percent >= 75
                ? "warning"
                : "stable",
        }))
      : HOSPITALS.map((h) => ({
          id: String(h.id),
          name: h.name,
          occupied: h.occupied,
          beds: h.beds,
          status: h.status,
        }));

  const displayAlerts =
    alerts.length > 0
      ? alerts.map((a) => ({
          id: a.id,
          level: a.severity,
          msg: a.title,
          time: new Date(a.created_at).toLocaleString(),
          source: a.hospital_id,
          confidence: 85,
        }))
      : FEED_ALERTS;

  return (
    <>
      {apiOffline && (
        <div className="api-banner" role="status">
          API offline — showing demo data. Start the FastAPI backend for live hospitals and alerts.
        </div>
      )}
      <div className="kpi-grid">
        <KpiCard
          label="Connected Hospitals"
          value={hospitals.length || HOSPITALS.length}
          sub="All nodes active"
          icon="🏥"
          trend={[3, 4, 4, 5, 5, 5, 5]}
          live
        />
        <KpiCard
          label="Critical Alerts"
          value={criticalCount}
          sub="Requires attention"
          icon="🚨"
          tone={criticalCount > 0 ? "critical" : "default"}
          trend={EMERGENCY_TREND}
          live
        />
        <KpiCard
          label="Avg ICU Occupancy"
          value={`${avgOccupancy.toFixed(1)}%`}
          sub={`${pct(totalOccupied, totalBeds)}% bed occupancy network-wide`}
          icon="💊"
          tone={avgOccupancy >= 85 ? "warning" : "default"}
          trend={ICU_TREND}
          live
        />
        <KpiCard
          label="ICU Beds Free"
          value={icuFree}
          sub={`${totalIcuUsed}/${totalIcu || hospitals.reduce((s, h) => s + h.icu_beds_total, 0)} ICU in use`}
          icon="🛏"
          tone="success"
          trend={[20, 18, 16, 15, 14, 12, 11]}
        />
      </div>

      <SectionTitle icon="⚡" title="Quick Actions" />
      <div className="grid-quick">
        {QUICK_ACTIONS.map((a) => (
          <Link key={a.label} to={a.href} className="quick-action">
            <span className="quick-action__icon">{a.icon}</span>
            {a.label}
          </Link>
        ))}
      </div>

      <SectionTitle icon="📈" title="Smart Analytics" />
      <div className="analytics-grid">
        <GlassCard>
          <LineChart
            title="Emergency Trends"
            data={EMERGENCY_TREND}
            labels={["Jan", "Apr", "Jul", "Oct"]}
            color="#818cf8"
          />
        </GlassCard>
        <GlassCard>
          <LineChart title="ICU Occupancy Forecast" data={ICU_TREND} color="#22d3ee" />
        </GlassCard>
        <GlassCard>
          <LineChart title="Medicine Stock Index" data={MEDICINE_TREND} color="#f472b6" />
        </GlassCard>
      </div>

      <div className="grid-2">
        <GlassCard>
          <SectionTitle
            icon="🏥"
            title="Hospital Status"
            action={<Link to="/hospitals" className="link-muted">View all →</Link>}
          />
          {displayHospitals.map((h) => (
            <div key={h.id} className="hospital-list-item">
              <div className="hospital-list-item__row">
                <span>{h.name}</span>
                <StatusBadge status={h.status} />
              </div>
              <ProgressBar value={h.occupied} max={h.beds} />
              <div className="text-muted" style={{ fontSize: "0.72rem", marginTop: 4 }}>
                {h.occupied}/{h.beds} beds
              </div>
            </div>
          ))}
        </GlassCard>

        <GlassCard>
          <SectionTitle
            icon="🚨"
            title="Recent Alerts"
            action={<Link to="/emergency-control" className="link-muted">Emergency →</Link>}
          />
          <div className="alert-feed">
            {displayAlerts.slice(0, 5).map((a) => {
              const c = statusColor(a.level);
              return (
                <div
                  key={a.id}
                  className="alert-item"
                  style={{ background: c.bg, borderColor: c.dot }}
                >
                  <div className="alert-item__meta">
                    <StatusBadge status={a.level} label={a.level} />
                    <span>
                      {a.time} · {a.source} · {a.confidence}% conf.
                    </span>
                  </div>
                  <div className="alert-item__msg" style={{ color: c.text }}>
                    {a.msg}
                  </div>
                  <div className="alert-item__escalation">
                    {ESCALATION[a.level] ?? "Review incident log"}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="grid-2" style={{ marginTop: "1.25rem" }}>
        <GlassCard>
          <SectionTitle icon="📦" title="Resource Stock Overview" />
          <div className="stock-grid">
            {RESOURCE_STOCK.map((s) => (
              <div key={s.item} className="stock-card">
                <StatusBadge status={s.status} />
                <div className="stock-card__value" style={{ marginTop: 8 }}>
                  {s.level}
                  {s.unit === "%" ? "%" : ""}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>{s.item}</div>
                <div
                  className={`stock-card__trend stock-card__trend--${s.trend < 0 ? "down" : "up"}`}
                >
                  {s.trend > 0 ? "↑" : "↓"} {Math.abs(s.trend)}% vs yesterday
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle icon="◎" title="AI Predictions" />
          <div className="prediction-grid">
            {AI_PREDICTIONS.slice(0, 3).map((p) => (
              <div key={p.label} style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <strong style={{ fontSize: "0.85rem" }}>{p.label}</strong>
                  <StatusBadge status={p.risk} label={`${p.risk} risk`} />
                </div>
                <p className="text-muted" style={{ fontSize: "0.75rem", margin: "0 0 6px" }}>
                  {p.site} · {p.horizon}
                </p>
                <ProgressBar value={p.confidence} max={100} />
              </div>
            ))}
          </div>
          <Link to="/ai-predictions" className="link-muted">
            View all predictions →
          </Link>
        </GlassCard>
      </div>

      <div className="grid-3" style={{ marginTop: "1.25rem" }}>
        <GlassCard>
          <SectionTitle icon="🚑" title="Ambulance Fleet" />
          <p className="text-muted" style={{ fontSize: "0.85rem", margin: 0 }}>
            {AMBULANCES.filter((a) => a.status === "active").length} active ·{" "}
            {AMBULANCES.length} total
          </p>
        </GlassCard>
        <GlassCard>
          <SectionTitle icon="📡" title="IoT Sensors" />
          <p className="text-muted" style={{ fontSize: "0.85rem", margin: 0 }}>
            {IOT_DEVICES.filter((d) => d.status === "online").length} online ·{" "}
            {IOT_DEVICES.length} devices
          </p>
        </GlassCard>
        <GlassCard>
          <SectionTitle icon="💧" title="Water Quality" />
          <p className="text-muted" style={{ fontSize: "0.85rem", margin: 0 }}>
            1 zone at elevated risk — Zone B
          </p>
        </GlassCard>
      </div>
    </>
  );
}



