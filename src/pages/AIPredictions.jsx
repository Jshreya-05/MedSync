import { AI_PREDICTIONS } from "../data";
import { sc } from "../helpers";
import { Card, PageHeader, Badge } from "../components/UI";

export default function AIPredictions() {
  return (
    <div>
      <PageHeader title="AI Predictive Analytics" sub="Machine-learning forecasts for healthcare and environment" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {AI_PREDICTIONS.map((p, i) => {
          const c = sc(p.risk);
          return (
            <Card key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#191b23" }}>{p.label}</span>
                <Badge status={p.risk} label={p.risk[0].toUpperCase() + p.risk.slice(1) + " Risk"} />
              </div>
              <div style={{ fontSize: 13, color: "#737685", marginBottom: 12 }}>📍 {p.site} &nbsp;·&nbsp; ⏱ {p.horizon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, background: "#e1e2ec", borderRadius: 6, height: 8, overflow: "hidden" }}>
                  <div style={{ width: `${p.confidence}%`, height: "100%", background: c.dot, borderRadius: 6 }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: c.dot, width: 46, textAlign: "right" }}>{p.confidence}%</span>
              </div>
              <div style={{ fontSize: 11, color: "#737685", marginTop: 4 }}>AI Confidence</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
