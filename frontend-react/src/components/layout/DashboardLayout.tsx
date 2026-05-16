import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  APP_NAME,
  APP_TAGLINE,
  NAV_ITEMS,
  PAGE_TITLES,
} from "../../config/navigation";
import { fetchHealth } from "../../lib/api";

export function DashboardLayout() {
  const location = useLocation();
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetchHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  const title = PAGE_TITLES[location.pathname] ?? APP_NAME;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon" aria-hidden>
            🏥
          </span>
          <div>
            <h1>{APP_NAME}</h1>
            <span>{APP_TAGLINE}</span>
          </div>
        </div>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  <span className="nav-icon" aria-hidden>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="api-status">
            <span
              className={`api-status-dot ${
                apiOnline === null
                  ? ""
                  : apiOnline
                    ? "online"
                    : "offline"
              }`}
            />
            API{" "}
            {apiOnline === null
              ? "checking…"
              : apiOnline
                ? "connected"
                : "offline — start backend"}
          </div>
        </div>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <h2>{title}</h2>
          <span className="topbar-meta">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </header>
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

