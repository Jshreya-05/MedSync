import { statusColor } from "../../data/mockData";

type StatusBadgeProps = {
  status: string;
  label?: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = statusColor(status);
  return (
    <span className="status-badge" style={{ background: c.bg, color: c.text }}>
      <span className="status-badge__dot" style={{ background: c.dot }} />
      {label ?? status.replace("-", " ")}
    </span>
  );
}





