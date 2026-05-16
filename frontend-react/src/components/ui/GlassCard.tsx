import type { CSSProperties, ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
  onClick?: () => void;
};

export function GlassCard({ children, className = "", style, hover, onClick }: GlassCardProps) {
  return (
    <div
      className={`glass-card${hover ? " glass-card--hover" : ""} ${className}`.trim()}
      style={style}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}





