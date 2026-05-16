import { useEffect, useState } from "react";
import { fetchHospitals, type Hospital } from "../lib/api";

function barClass(pct: number): string {
  if (pct >= 90) return "critical";
  if (pct >= 75) return "high";
  return "";
}

export function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHospitals()
      .then(setHospitals)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading-state">Loading hospitals…</p>;
  if (error) return <p className="error-state">{error}</p>;

  const sorted = [...hospitals].sort(
    (a, b) => b.occupancy_percent - a.occupancy_percent,
  );

  return (
    <section className="card">
      <div className="card-header">
        <h3>Hospital network</h3>
        <span className="topbar-meta">{hospitals.length} facilities</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>City</th>
              <th>ICU occupied</th>
              <th>ICU available</th>
              <th>Utilization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((h) => {
              const occupied = h.icu_beds_total - h.icu_beds_available;
              const status =
                h.occupancy_percent >= 90
                  ? "Critical"
                  : h.occupancy_percent >= 75
                    ? "High load"
                    : "Normal";
              return (
                <tr key={h.id}>
                  <td>
                    <strong>{h.name}</strong>
                  </td>
                  <td>{h.city}</td>
                  <td>{occupied}</td>
                  <td>{h.icu_beds_available}</td>
                  <td>
                    <div className="occupancy-cell">
                      <div className="occupancy-bar" style={{ width: 100 }}>
                        <div
                          className={`occupancy-fill ${barClass(h.occupancy_percent)}`}
                          style={{ width: `${h.occupancy_percent}%` }}
                        />
                      </div>
                      <span>{h.occupancy_percent}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        h.occupancy_percent >= 90
                          ? "critical"
                          : h.occupancy_percent >= 75
                            ? "high"
                            : "low"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
