import { MiniSparkline } from "./MiniSparkline";

type KpiCardProps = {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  trend?: number[];
  tone?: "default" | "critical" | "warning" | "success";
  live?: boolean;
};

export function KpiCard({ label, value, sub, icon, trend, tone = "default", live }: KpiCardProps) {
  return (
    <div className={`kpi-card kpi-card--${tone}`}>
      <div className="kpi-card__glow" aria-hidden />
      <div className="kpi-card__top">
        <span className="kpi-card__icon">{icon}</span>
        {live && (
          <span className="kpi-card__live">
            <span className="pulse" /> Live
          </span>
        )}
        {trend && (
          <MiniSparkline
            data={trend}
            color={tone === "critical" ? "#ef4444" : "#818cf8"}
          />
        )}
      </div>
      <div className="kpi-card__value">{value}</div>
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__sub">{sub}</div>
    </div>
  );
}




