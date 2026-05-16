const SITES = [
  { site: "City General — Ward A", ph: 7.2, turbidity: 0.8, status: "ok" },
  { site: "Metro Care — ICU wing", ph: 6.9, turbidity: 1.1, status: "warning" },
  { site: "Riverside — Emergency", ph: 7.4, turbidity: 0.6, status: "ok" },
];

export function WaterQualityPage() {
  return (
    <section className="card">
      <div className="card-header">
        <h3>Water quality monitoring</h3>
        <span className="topbar-meta">IoT sensors · live sync Phase 4</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Site</th>
              <th>pH</th>
              <th>Turbidity (NTU)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {SITES.map((s) => (
              <tr key={s.site}>
                <td>💧 {s.site}</td>
                <td>{s.ph}</td>
                <td>{s.turbidity}</td>
                <td>
                  <span className={`badge ${s.status === "ok" ? "low" : "high"}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
