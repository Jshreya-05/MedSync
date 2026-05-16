import { pct, sc } from "../helpers";

export const Badge = ({ status, label }) => {
  const c = sc(status);
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {label || status}
    </span>
  );
};

export const ProgressBar = ({ value, max }) => {
  const p = pct(value, max);
  const color = p >= 90 ? "#ba1a1a" : p >= 75 ? "#f59e0b" : "#003d9b";
  return (
    <div style={{ background: "#e1e2ec", borderRadius: 6, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${p}%`, height: "100%", background: color, borderRadius: 6 }} />
    </div>
  );
};

export const Card = ({ children, style = {} }) => (
  <div style={{ background: "#fff", border: "1px solid #e1e2ec", borderRadius: 12, padding: 20, ...style }}>
    {children}
  </div>
);

export const Section = ({ icon, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
    <span style={{ fontSize: 18 }}>{icon}</span>
    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#191b23" }}>{title}</h2>
  </div>
);

export const PageHeader = ({ title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ fontSize: 22, fontWeight: 800, color: "#191b23", margin: 0 }}>{title}</h1>
    <p style={{ fontSize: 13, color: "#737685", margin: "4px 0 0" }}>{sub}</p>
  </div>
);

export const TH = ({ children }) => (
  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#737685", borderBottom: "1px solid #e1e2ec", whiteSpace: "nowrap" }}>{children}</th>
);

export const TD = ({ children, bold, blue }) => (
  <td style={{ padding: "11px 14px", fontSize: 13, color: bold ? "#191b23" : blue ? "#003d9b" : "#555", fontWeight: bold || blue ? 700 : 400 }}>{children}</td>
);
