const MOCK_REQUESTS = [
  {
    id: "req-001",
    from: "City General Hospital",
    resource: "Oxygen cylinders",
    qty: 12,
    status: "pending",
  },
  {
    id: "req-002",
    from: "Metro Care Center",
    resource: "ICU beds",
    qty: 3,
    status: "approved",
  },
  {
    id: "req-003",
    from: "Riverside Medical",
    resource: "Ventilators",
    qty: 2,
    status: "fulfilled",
  },
];

export function ResourceExchangePage() {
  return (
  <>
      <section className="card">
        <div className="card-header">
          <h3>Inter-hospital resource exchange</h3>
          <span className="topbar-meta">Approve &amp; route supplies</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>From hospital</th>
                <th>Resource</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REQUESTS.map((r) => (
                <tr key={r.id}>
                  <td className="mono-cell">{r.id}</td>
                  <td>{r.from}</td>
                  <td>{r.resource}</td>
                  <td>{r.qty}</td>
                  <td>
                    <span className={`badge badge--${r.status}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="page-hint">
        Backend route <code>POST /api/resource-request</code> will replace mock data in Phase 2.
      </p>
    </>
  );
}
