type LineChartProps = {
  data: number[];
  labels?: string[];
  title: string;
  color?: string;
  height?: number;
};

export function LineChart({ data, labels, title, color = "#6366f1", height = 140 }: LineChartProps) {
  const min = Math.min(...data) * 0.9;
  const max = Math.max(...data) * 1.05;
  const range = max - min || 1;
  const w = 100;
  const h = height - 24;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const gradId = `grad-${title.replace(/\s/g, "")}`;

  return (
    <div className="line-chart">
      <div className="line-chart__title">{title}</div>
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="line-chart__svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#${gradId})`} />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {labels && (
        <div className="line-chart__labels">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}




