export const HOSPITALS = [
  { id: 1, name: "City General Hospital", beds: 450, occupied: 378, icu: 32, icuUsed: 28, status: "critical" as const, region: "North" },
  { id: 2, name: "St. Mary's Medical Center", beds: 320, occupied: 241, icu: 24, icuUsed: 18, status: "stable" as const, region: "South" },
  { id: 3, name: "Regional Trauma Center", beds: 180, occupied: 162, icu: 16, icuUsed: 15, status: "warning" as const, region: "East" },
  { id: 4, name: "Children's Healthcare Hub", beds: 220, occupied: 145, icu: 20, icuUsed: 9, status: "stable" as const, region: "West" },
  { id: 5, name: "University Medical Complex", beds: 600, occupied: 487, icu: 48, icuUsed: 41, status: "warning" as const, region: "Central" },
];

export const AMBULANCES = [
  { id: "AMB-001", status: "active", location: "North District", eta: "4 min", crew: "Dr. Ramos + Patel", load: "Critical" },
  { id: "AMB-002", status: "standby", location: "Station 7", eta: "—", crew: "Dr. Kim + Singh", load: "—" },
  { id: "AMB-003", status: "active", location: "Highway 40 Exit 12", eta: "11 min", crew: "Paramedic Chen", load: "Stable" },
  { id: "AMB-004", status: "returning", location: "City General", eta: "2 min", crew: "Dr. Okafor + Liu", load: "—" },
  { id: "AMB-005", status: "standby", location: "Station 3", eta: "—", crew: "Paramedic Torres", load: "—" },
];

export const RESOURCES = [
  { id: 1, item: "Ventilators", from: "City General", to: "Regional Trauma", qty: 5, status: "in-transit", urgent: true },
  { id: 2, item: "Blood (O-Neg)", from: "Blood Bank Central", to: "St. Mary's", qty: 12, status: "approved", urgent: true },
  { id: 3, item: "Portable ECG Units", from: "University Medical", to: "Children's Hub", qty: 3, status: "pending", urgent: false },
  { id: 4, item: "Dialysis Equipment", from: "Renal Center North", to: "City General", qty: 2, status: "in-transit", urgent: false },
];

export const RESOURCE_STOCK = [
  { item: "Oxygen Cylinders", level: 34, unit: "units", trend: -12, status: "critical" as const },
  { item: "Ventilators", level: 18, unit: "available", trend: -3, status: "warning" as const },
  { item: "ICU Beds", level: 26, unit: "free", trend: 2, status: "warning" as const },
  { item: "Medicine Stock", level: 72, unit: "%", trend: -8, status: "stable" as const },
  { item: "Staff On Duty", level: 89, unit: "%", trend: 4, status: "stable" as const },
];

export const WATER_SENSORS = [
  { zone: "Hospital Zone A", ph: 7.2, turbidity: 0.4, tds: 312, temp: 22.3, bod: 2.1, cod: 8.4, do: 7.8, contamIndex: 0.12, status: "safe" as const },
  { zone: "Hospital Zone B", ph: 6.8, turbidity: 1.8, tds: 480, temp: 24.1, bod: 5.2, cod: 18.1, do: 5.9, contamIndex: 0.68, status: "warning" as const },
  { zone: "ICU Water Supply", ph: 7.1, turbidity: 0.2, tds: 280, temp: 21.8, bod: 1.8, cod: 6.2, do: 8.1, contamIndex: 0.08, status: "safe" as const },
  { zone: "Surgical Block", ph: 7.4, turbidity: 0.3, tds: 295, temp: 22.0, bod: 2.0, cod: 7.1, do: 7.9, contamIndex: 0.09, status: "safe" as const },
];

export const IOT_DEVICES = [
  { id: "SEN-001", type: "Water pH", zone: "Zone A", battery: 87, signal: "Strong", lastPing: "12s ago", status: "online" as const },
  { id: "SEN-002", type: "Air Quality", zone: "ICU", battery: 64, signal: "Strong", lastPing: "8s ago", status: "online" as const },
  { id: "SEN-003", type: "Temperature", zone: "Zone B", battery: 22, signal: "Weak", lastPing: "45s ago", status: "warning" as const },
  { id: "SEN-004", type: "Turbidity", zone: "Surgical", battery: 91, signal: "Strong", lastPing: "5s ago", status: "online" as const },
  { id: "SEN-005", type: "TDS", zone: "Zone B", battery: 0, signal: "None", lastPing: "8m ago", status: "offline" as const },
];

export const FEED_ALERTS = [
  { id: 1, level: "critical" as const, msg: "ICU capacity at 95% — Regional Trauma Center", time: "2m ago", source: "ICU Monitor", confidence: 92 },
  { id: 2, level: "warning" as const, msg: "Water contamination risk detected — Hospital Zone B", time: "5m ago", source: "Water IoT", confidence: 74 },
  { id: 3, level: "info" as const, msg: "Ventilator transfer confirmed — City General → Trauma", time: "12m ago", source: "Resource Hub", confidence: 100 },
  { id: 4, level: "critical" as const, msg: "Ambulance AMB-003 rerouted — accident on Highway 40", time: "18m ago", source: "Fleet GPS", confidence: 88 },
  { id: 5, level: "warning" as const, msg: "SEN-005 sensor offline — Zone B TDS unmonitored", time: "21m ago", source: "IoT Gateway", confidence: 100 },
];

export const AI_PREDICTIONS = [
  { label: "Patient Inflow Surge", confidence: 87, horizon: "Next 4 hours", risk: "high" as const, site: "City General" },
  { label: "ICU Overflow Risk", confidence: 92, horizon: "Next 2 hours", risk: "high" as const, site: "Regional Trauma" },
  { label: "Water Contamination Spread", confidence: 74, horizon: "Next 12 hours", risk: "medium" as const, site: "Hospital Zone B" },
  { label: "Resource Shortage — O2", confidence: 68, horizon: "Next 24 hours", risk: "medium" as const, site: "University Medical" },
  { label: "Ambulance Route Delay", confidence: 81, horizon: "Next 1 hour", risk: "low" as const, site: "North District" },
];

export const EMERGENCY_TREND = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35, 29, 38];
export const ICU_TREND = [72, 74, 76, 78, 79, 81, 83, 85, 84, 88, 90, 92];
export const MEDICINE_TREND = [88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 65];

export const QUICK_ACTIONS = [
  { label: "Add Patient", icon: "＋", href: "/hospitals" },
  { label: "Emergency Case", icon: "⚡", href: "/emergency-control" },
  { label: "Bed Management", icon: "🛏", href: "/hospitals" },
  { label: "Ambulance Dispatch", icon: "◈", href: "/ambulance-network" },
  { label: "Generate Report", icon: "📄", href: "/settings" },
  { label: "AI Recommendation", icon: "◎", href: "/ai-predictions" },
];

export const pct = (a: number, b: number) => Math.round((a / b) * 100);

export type StatusKey =
  | "critical" | "warning" | "stable" | "safe" | "online" | "offline"
  | "active" | "standby" | "returning" | "in-transit" | "approved" | "pending"
  | "high" | "medium" | "low" | "info";

export const STATUS_COLORS: Record<StatusKey, { bg: string; text: string; dot: string }> = {
  critical: { bg: "rgba(239,68,68,0.15)", text: "#fca5a5", dot: "#ef4444" },
  warning: { bg: "rgba(245,158,11,0.15)", text: "#fcd34d", dot: "#f59e0b" },
  stable: { bg: "rgba(34,197,94,0.12)", text: "#86efac", dot: "#22c55e" },
  safe: { bg: "rgba(34,197,94,0.12)", text: "#86efac", dot: "#22c55e" },
  online: { bg: "rgba(59,130,246,0.15)", text: "#93c5fd", dot: "#3b82f6" },
  offline: { bg: "rgba(148,163,184,0.12)", text: "#94a3b8", dot: "#64748b" },
  active: { bg: "rgba(34,197,94,0.12)", text: "#86efac", dot: "#22c55e" },
  standby: { bg: "rgba(59,130,246,0.15)", text: "#93c5fd", dot: "#3b82f6" },
  returning: { bg: "rgba(245,158,11,0.15)", text: "#fcd34d", dot: "#f59e0b" },
  "in-transit": { bg: "rgba(99,102,241,0.15)", text: "#a5b4fc", dot: "#6366f1" },
  approved: { bg: "rgba(34,197,94,0.12)", text: "#86efac", dot: "#22c55e" },
  pending: { bg: "rgba(245,158,11,0.15)", text: "#fcd34d", dot: "#f59e0b" },
  high: { bg: "rgba(239,68,68,0.15)", text: "#fca5a5", dot: "#ef4444" },
  medium: { bg: "rgba(245,158,11,0.15)", text: "#fcd34d", dot: "#f59e0b" },
  low: { bg: "rgba(34,197,94,0.12)", text: "#86efac", dot: "#22c55e" },
  info: { bg: "rgba(59,130,246,0.15)", text: "#93c5fd", dot: "#3b82f6" },
};

export function statusColor(s: string) {
  return STATUS_COLORS[s as StatusKey] ?? { bg: "rgba(148,163,184,0.1)", text: "#94a3b8", dot: "#64748b" };
}
