import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APP_NAME, PAGE_SUBTITLES, PAGE_TITLES } from "../../config/navigation";
import { fetchHealth } from "../../lib/api";

type TopBarProps = {
  onMenuClick?: () => void;
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetchHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const title = PAGE_TITLES[location.pathname] ?? "Dashboard";
  const subtitle = PAGE_SUBTITLES[location.pathname] ?? "";

  return (
    <header className="topbar-premium">
      <button
        type="button"
        className="topbar-menu-btn"
        aria-label="Open navigation menu"
        onClick={onMenuClick}
      >
        ☰
      </button>
      <div className="topbar-premium__left">
        <p className="topbar-premium__welcome">
          Welcome back, <strong>Dr. Admin</strong>
        </p>
        <h1 className="topbar-premium__title">{title}</h1>
        <p className="topbar-premium__subtitle">{subtitle}</p>
      </div>

      <div className="topbar-premium__center">
        <div className="search-bar">
          <span className="search-bar__icon" aria-hidden>
            ⌕
          </span>
          <input type="search" placeholder="Search hospitals, alerts, patients…" />
        </div>
      </div>

      <div className="topbar-premium__right">
        <div className={`system-pill ${apiOnline ? "system-pill--online" : "system-pill--offline"}`}>
          <span className="pulse" />
          {apiOnline === null ? "Syncing" : apiOnline ? "Systems Online" : "API Offline"}
        </div>
        <button type="button" className="icon-btn" aria-label="Notifications">
          🔔
          <span className="icon-btn__badge">3</span>
        </button>
        <div className="datetime-block">
          <span className="datetime-block__time">
            {time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="datetime-block__date">
            {time.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          </span>
        </div>
        <button type="button" className="profile-chip">
          <span className="profile-chip__avatar">DA</span>
          <span className="profile-chip__info">
            <strong>Dr. Admin</strong>
            <small>{APP_NAME}</small>
          </span>
          <span className="profile-chip__chevron">▾</span>
        </button>
      </div>
    </header>
  );
}




