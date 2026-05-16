const AMBULANCES = [
  { id: "AMB-01", unit: "Alpha-1", hospital: "City General", status: "en_route", eta: "4 min" },
  { id: "AMB-02", unit: "Bravo-2", hospital: "Metro Care", status: "available", eta: "—" },
  { id: "AMB-03", unit: "Charlie-3", hospital: "Riverside Medical", status: "on_scene", eta: "—" },
  { id: "AMB-04", unit: "Delta-4", hospital: "City General", status: "transport", eta: "12 min" },
];

export function AmbulanceNetworkPage() {
  return (
    <section className="card">
      <div className="card-header">
        <h3>Fleet status</h3>
        <span className="topbar-meta">{AMBULANCES.length} units tracked</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Base hospital</th>
              <th>Status</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {AMBULANCES.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>🚑 {a.unit}</strong>
                  <br />
                  <small className="text-muted">{a.id}</small>
                </td>
                <td>{a.hospital}</td>
                <td>
                  <span className={`badge badge--${a.status.replace("_", "-")}`}>
                    {a.status.replace("_", " ")}
                  </span>
                </td>
                <td>{a.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
