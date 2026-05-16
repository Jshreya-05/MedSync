export const pct = (a, b) => Math.round((a / b) * 100);

export const STATUS_COLORS = {
  critical:     { bg: "#ffdad6", text: "#ba1a1a", dot: "#ba1a1a" },
  warning:      { bg: "#fff3cd", text: "#7d5a00", dot: "#f59e0b" },
  stable:       { bg: "#d4f8d4", text: "#004f11", dot: "#22c55e" },
  safe:         { bg: "#d4f8d4", text: "#004f11", dot: "#22c55e" },
  online:       { bg: "#dde2f3", text: "#003d9b", dot: "#003d9b" },
  offline:      { bg: "#f5f5f5", text: "#737685", dot: "#9ca3af" },
  active:       { bg: "#d4f8d4", text: "#004f11", dot: "#22c55e" },
  standby:      { bg: "#dde2f3", text: "#003d9b", dot: "#3b82f6" },
  returning:    { bg: "#fff3cd", text: "#7d5a00", dot: "#f59e0b" },
  "in-transit": { bg: "#dde2f3", text: "#003d9b", dot: "#3b82f6" },
  approved:     { bg: "#d4f8d4", text: "#004f11", dot: "#22c55e" },
  pending:      { bg: "#fff3cd", text: "#7d5a00", dot: "#f59e0b" },
  high:         { bg: "#ffdad6", text: "#ba1a1a", dot: "#ba1a1a" },
  medium:       { bg: "#fff3cd", text: "#7d5a00", dot: "#f59e0b" },
  low:          { bg: "#d4f8d4", text: "#004f11", dot: "#22c55e" },
  info:         { bg: "#dde2f3", text: "#003d9b", dot: "#3b82f6" },
};

export const sc = (s) => STATUS_COLORS[s] || { bg: "#ededf8", text: "#434654", dot: "#737685" };
