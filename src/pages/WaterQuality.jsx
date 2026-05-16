import { WATER_SENSORS } from "../data";
import { sc } from "../helpers";
import { Card, Section, PageHeader, Badge } from "../components/UI";

export default function WaterQuality() {
  return (
    <div>
      <PageHeader title="Water Quality Monitoring" sub="Real-time hospital water safety sensors" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {WATER_SENSORS.map((s, i) => {
          const c = sc(s.status);
          return (
            <Card key={i} style={{ borderLeft: `4px solid ${c.dot}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#191b23" }}>{s.zone}</div>
                <Badge status={s.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "pH",        value: s.ph,          unit: "",      warn: s.ph < 6.9 || s.ph > 7.5 },
                  { label: "Turbidity", value: s.turbidity,   unit: " NTU",  warn: s.turbidity > 1           },
                  { label: "TDS",       value: s.tds,         unit: " mg/L", warn: s.tds > 400               },
                  { label: "Temp",      value: s.temp,        unit: "°C",    warn: s.temp > 25               },
                  { label: "Contam.",   value: s.contamIndex, unit: "",      warn: s.contamIndex > 0.5        },
                ].map(m => (
                  <div key={m.label} style={{ background: m.warn ? "#fff3cd" : "#f3f3fd", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ fontSize: 11, color: "#737685" }}>{m.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: m.warn ? "#7d5a00" : "#003d9b" }}>
                      {m.value}{m.unit}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      <Card>
        <Section icon="⚠️" title="AI Water Safety Alert" />
        <div style={{ background: "#fff3cd", border: "1px solid #f59e0b", borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7d5a00", marginBottom: 4 }}>Contamination Risk — Hospital Zone B</div>
          <div style={{ fontSize: 13, color: "#191b23", lineHeight: 1.6 }}>
            Elevated turbidity (1.8 NTU) and contamination index (0.68) detected. Recommended action: disable Zone B supply and activate backup source. Bacterial risk: moderate.
          </div>
        </div>
      </Card>
    </div>
  );
}
