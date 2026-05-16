import { NavLink } from "react-router-dom";
import { APP_NAME, APP_TAGLINE, NAV_ITEMS } from "../../config/navigation";

type SidebarProps = {
  apiOnline: boolean | null;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({ apiOnline, onLogout, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop${mobileOpen ? " sidebar-backdrop--visible" : ""}`}
        aria-label="Close menu"
        onClick={onCloseMobile}
      />
      <aside className={`sidebar-premium${mobileOpen ? " sidebar-premium--open" : ""}`}>
        <div className="sidebar-premium__brand">
          <span className="sidebar-premium__logo" aria-hidden>
            🏥
          </span>
          <div>
            <h1>{APP_NAME}</h1>
            <span>{APP_TAGLINE}</span>
          </div>
        </div>

        <p className="sidebar-premium__section-label">Navigation</p>
        <nav className="sidebar-premium__nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar-nav-item${isActive ? " sidebar-nav-item--active" : ""}`
              }
            >
              <span className="sidebar-nav-item__icon" aria-hidden>
                {item.icon}
              </span>
              <span className="sidebar-nav-item__label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-premium__footer">
          <div className="sidebar-profile glass-card">
            <span className="sidebar-profile__avatar">DA</span>
            <div>
              <strong>Dr. Admin</strong>
              <span>Chief Medical Officer</span>
            </div>
          </div>
          <div
            className={`sidebar-api glass-card ${apiOnline ? "sidebar-api--ok" : apiOnline === false ? "sidebar-api--err" : ""}`}
          >
            <span className="pulse" />
            <div>
              <strong>API Status</strong>
              <span>
                {apiOnline === null ? "Checking…" : apiOnline ? "Connected" : "Offline — start backend"}
              </span>
            </div>
          </div>
          <button type="button" className="btn btn--ghost btn--full" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

