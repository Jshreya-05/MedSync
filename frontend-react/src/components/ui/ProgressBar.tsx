type ProgressBarProps = {
  value: number;
  max: number;
};

export function ProgressBar({ value, max }: ProgressBarProps) {
  const p = Math.round((value / max) * 100);
  const tone = p >= 90 ? "critical" : p >= 75 ? "warning" : "normal";
  return (
    <div className="progress-bar">
      <div className={`progress-bar__fill progress-bar__fill--${tone}`} style={{ width: `${p}%` }} />
    </div>
  );
}





