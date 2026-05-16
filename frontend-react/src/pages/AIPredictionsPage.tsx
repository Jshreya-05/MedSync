const PREDICTIONS = [
  {
    hospital: "City General Hospital",
    type: "ICU overload",
    forecast: "Predicted critical capacity in ~2 hours",
    confidence: 87,
    severity: "critical",
  },
  {
    hospital: "Metro Care Center",
    type: "Patient inflow",
    forecast: "15% increase expected this evening",
    confidence: 72,
    severity: "high",
  },
  {
    hospital: "Riverside Medical",
    type: "Medicine shortage",
    forecast: "Oxygen stock below threshold in 6 hours",
    confidence: 91,
    severity: "high",
  },
];

export function AIPredictionsPage() {
  return (
    <>
      <div className="prediction-grid">
        {PREDICTIONS.map((p) => (
          <article key={p.hospital + p.type} className="prediction-card">
            <div className="prediction-card__header">
              <span className="prediction-card__icon">🤖</span>
              <span className={`badge ${p.severity}`}>{p.type}</span>
            </div>
            <h3>{p.hospital}</h3>
            <p>{p.forecast}</p>
            <div className="prediction-confidence">
              <div className="occupancy-bar">
                <div
                  className="occupancy-fill"
                  style={{ width: `${p.confidence}%` }}
                />
              </div>
              <span>{p.confidence}% confidence</span>
            </div>
          </article>
        ))}
      </div>
      <p className="page-hint">ML engine integration — Phase 5</p>
    </>
  );
}
