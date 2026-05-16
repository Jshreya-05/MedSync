import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AssistantPanel } from "../ai/AssistantPanel";
import { fetchHealth } from "../../lib/api";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type DashboardLayoutProps = {
  onLogout: () => void;
};

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    fetchHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  return (
    <div className="app-shell">
      <div className="app-bg" aria-hidden />
      <Sidebar
        apiOnline={apiOnline}
        onLogout={onLogout}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      <div className="main-premium">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="main-premium__body">
          <Outlet />
        </main>
      </div>
      <AssistantPanel />
    </div>
  );
}
