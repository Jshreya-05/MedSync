import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAlerts, fetchHospitals, type Alert, type Hospital } from "../lib/api";

function occupancyClass(pct: number): string {
  if (pct >= 90) return "critical";
  if (pct >= 75) return "high";
  return "";
}

export function DashboardPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchHospitals(), fetchAlerts()])
      .then(([h, a]) => {
        setHospitals(h);
        setAlerts(a);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const criticalAlerts = alerts.filter((a) => a.severity === "critical").length;
  const avgOccupancy =
    hospitals.length > 0
      ? hospitals.reduce((s, h) => s + h.occupancy_percent, 0) / hospitals.length
      : 0;
  const totalIcuAvailable = hospitals.reduce((s, h) => s + h.icu_beds_available, 0);

  if (loading) return <p className="loading-state">Loading dashboard…</p>;
  if (error) return <p className="error-state">{error}</p>;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <label>Hospitals</label>
          <strong>{hospitals.length}</strong>
        </div>
        <div className={`stat-card ${criticalAlerts > 0 ? "critical" : "ok"}`}>
          <label>Critical alerts</label>
          <strong>{criticalAlerts}</strong>
        </div>
        <div className={`stat-card ${avgOccupancy >= 80 ? "warning" : "ok"}`}>
          <label>Avg ICU occupancy</label>
          <strong>{avgOccupancy.toFixed(1)}%</strong>
        </div>
        <div className="stat-card">
          <label>ICU beds free</label>
          <strong>{totalIcuAvailable}</strong>
        </div>
      </div>

      <div className="grid-2">
        <section className="card">
          <div className="card-header">
            <h3>Network hospitals</h3>
            <Link to="/hospitals">View hospitals →</Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>ICU free</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((h) => (
                  <tr key={h.id}>
                    <td>{h.name}</td>
                    <td>{h.city}</td>
                    <td>
                      {h.icu_beds_available} / {h.icu_beds_total}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <div className="occupancy-bar">
                          <div
                            className={`occupancy-fill ${occupancyClass(h.occupancy_percent)}`}
                            style={{ width: `${h.occupancy_percent}%` }}
                          />
                        </div>
                        <span>{h.occupancy_percent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h3>Recent alerts</h3>
            <Link to="/emergency-control">Emergency control →</Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 5).map((a) => (
                  <tr key={a.id}>
                    <td>
                      <strong>{a.title}</strong>
                      <br />
                      <small style={{ color: "var(--text-muted)" }}>
                        {a.message}
                      </small>
                    </td>
                    <td>
                      <span className={`badge ${a.severity}`}>{a.severity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}


