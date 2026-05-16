type SectionTitleProps = {
  icon?: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionTitle({ icon, title, action }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__left">
        {icon && <span className="section-title__icon">{icon}</span>}
        <h3>{title}</h3>
      </div>
      {action}
    </div>
  );
}




