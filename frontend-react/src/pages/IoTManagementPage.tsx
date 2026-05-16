const DEVICES = [
  { id: "iot-icu-01", name: "ICU Bed Sensor A1", type: "Bed monitor", hospital: "City General", online: true },
  { id: "iot-o2-02", name: "O2 Tank Level", type: "Gas sensor", hospital: "Metro Care", online: true },
  { id: "iot-amb-03", name: "Ambulance GPS Tracker", type: "GPS", hospital: "Fleet", online: true },
  { id: "iot-wq-04", name: "Water pH Node", type: "Water quality", hospital: "Riverside", online: false },
];

export function IoTManagementPage() {
  return (
    <section className="card">
      <div className="card-header">
        <h3>Connected devices</h3>
        <span className="topbar-meta">
          {DEVICES.filter((d) => d.online).length}/{DEVICES.length} online
        </span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Type</th>
              <th>Hospital</th>
              <th>Connection</th>
            </tr>
          </thead>
          <tbody>
            {DEVICES.map((d) => (
              <tr key={d.id}>
                <td>
                  <strong>📡 {d.name}</strong>
                  <br />
                  <small className="text-muted">{d.id}</small>
                </td>
                <td>{d.type}</td>
                <td>{d.hospital}</td>
                <td>
                  <span className={`badge ${d.online ? "low" : "critical"}`}>
                    {d.online ? "online" : "offline"}
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
