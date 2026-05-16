import { useState } from "react";
import { HOSPITALS } from "../data";
import { pct } from "../helpers";
import { Card, PageHeader, Badge, ProgressBar } from "../components/UI";

export default function Hospitals() {
  const [sel, setSel] = useState(null);
  const h = HOSPITALS.find(x => x.id === sel);

  return (
    <div>
      <PageHeader title="Hospital Management" sub="Monitor all connected hospitals in real time" />
      <div style={{ display: "grid", gridTemplateColumns: sel ? "1fr 340px" : "1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {HOSPITALS.map(h => (
            <Card key={h.id}
              style={{ cursor: "pointer", border: sel === h.id ? "2px solid #003d9b" : "1px solid #e1e2ec" }}
              onClick={() => setSel(sel === h.id ? null : h.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#191b23" }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: "#737685" }}>{h.region} Region</div>
                </div>
                <Badge status={h.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Bed Occupancy", h.occupied, h.beds], ["ICU Capacity", h.icuUsed, h.icu]].map(([lbl, val, max]) => (
                  <div key={lbl}>
                    <div style={{ fontSize: 11, color: "#737685", marginBottom: 4 }}>{lbl}</div>
                    <ProgressBar value={val} max={max} />
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#191b23", marginTop: 4 }}>{val}/{max} ({pct(val, max)}%)</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {sel && h && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#191b23" }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "#737685" }}>{h.region} Region</div>
              </div>
              <button onClick={() => setSel(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#737685" }}>✕</button>
            </div>
            <Badge status={h.status} label={h.status[0].toUpperCase() + h.status.slice(1)} />
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                ["Total Beds", h.beds], ["Occupied", h.occupied], ["Available", h.beds - h.occupied],
                ["ICU Total", h.icu],   ["ICU Used", h.icuUsed],  ["ICU Free", h.icu - h.icuUsed],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f3fd" }}>
                  <span style={{ fontSize: 13, color: "#737685" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#191b23" }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 12, color: "#737685", marginBottom: 6 }}>Bed Utilisation</div>
              <ProgressBar value={h.occupied} max={h.beds} />
              <div style={{ fontSize: 24, fontWeight: 800, color: "#003d9b", marginTop: 6 }}>{pct(h.occupied, h.beds)}%</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
