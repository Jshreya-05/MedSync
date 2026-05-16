export function SettingsPage() {
  return (
    <div className="settings-grid">
      <section className="card settings-card">
        <div className="card-header">
          <h3>Organization</h3>
        </div>
        <div className="settings-body">
          <label className="field">
            <span>System name</span>
            <input type="text" defaultValue="HEMS AI" readOnly />
          </label>
          <label className="field">
            <span>Region</span>
            <input type="text" defaultValue="Maharashtra, India" />
          </label>
        </div>
      </section>
      <section className="card settings-card">
        <div className="card-header">
          <h3>Notifications</h3>
        </div>
        <div className="settings-body">
          <label className="field field--checkbox">
            <input type="checkbox" defaultChecked />
            <span>Critical ICU alerts</span>
          </label>
          <label className="field field--checkbox">
            <input type="checkbox" defaultChecked />
            <span>Emergency dispatch</span>
          </label>
          <label className="field field--checkbox">
            <input type="checkbox" />
            <span>Water quality warnings</span>
          </label>
        </div>
      </section>
      <section className="card settings-card">
        <div className="card-header">
          <h3>API &amp; integrations</h3>
        </div>
        <div className="settings-body">
          <label className="field">
            <span>Backend URL</span>
            <input type="text" placeholder="http://127.0.0.1:8000" />
          </label>
          <p className="page-hint" style={{ margin: 0 }}>
            Supabase connection — configure in Phase 3
          </p>
        </div>
      </section>
    </div>
  );
}
