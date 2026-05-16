type PagePlaceholderProps = {
  icon: string;
  title: string;
  description: string;
  phase?: string;
};

export function PagePlaceholder({
  icon,
  title,
  description,
  phase,
}: PagePlaceholderProps) {
  return (
    <div className="placeholder-panel placeholder-panel--hero">
      <span className="placeholder-icon" aria-hidden>
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {phase && <span className="placeholder-phase">{phase}</span>}
    </div>
  );
}






