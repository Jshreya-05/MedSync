import { useEffect, useState } from "react";
import { fetchAlerts, type Alert } from "../lib/api";

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

  if (loading) return <p className="loading-state">Loading emergency feed…</p>;
  if (error) return <p className="error-state">{error}</p>;

  const critical = alerts.filter((a) => a.severity === "critical").length;

  return (
    <>
      <div className="stats-grid stats-grid--compact">
        <div className="stat-card">
          <label>Active incidents</label>
          <strong>{alerts.length}</strong>
        </div>
        <div className={`stat-card ${critical > 0 ? "critical" : "ok"}`}>
          <label>Critical</label>
          <strong>{critical}</strong>
        </div>
      </div>
      <section className="card">
        <div className="card-header">
          <h3>Emergency control center</h3>
          <span className="topbar-meta">Live dispatch feed</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Hospital</th>
                <th>Incident</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id}>
                  <td className="mono-cell">
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                  <td>{a.hospital_id}</td>
                  <td>
                    <strong>{a.title}</strong>
                    <br />
                    <small className="text-muted">{a.message}</small>
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
    </>
  );
}
