import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoadingState } from "./components/ui/LoadingState";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import { LoginPage } from "./pages/LoginPage";
import { AIPredictionsPage } from "./pages/AIPredictionsPage";
import { AmbulanceNetworkPage } from "./pages/AmbulanceNetworkPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EmergencyControlPage } from "./pages/EmergencyControlPage";
import { HospitalsPage } from "./pages/HospitalsPage";
import { IoTManagementPage } from "./pages/IoTManagementPage";
import { ResourceExchangePage } from "./pages/ResourceExchangePage";
import { SettingsPage } from "./pages/SettingsPage";
import { WaterQualityPage } from "./pages/WaterQualityPage";

const DEMO_AUTH_KEY = "medsync-auth";

export default function App() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [demoLoggedIn, setDemoLoggedIn] = useState(
    () => !isSupabaseConfigured && sessionStorage.getItem(DEMO_AUTH_KEY) === "1",
  );

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = isSupabaseConfigured ? Boolean(user) : demoLoggedIn;

  const handleDemoLogin = () => {
    sessionStorage.setItem(DEMO_AUTH_KEY, "1");
    setDemoLoggedIn(true);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
      setUser(null);
    } else {
      sessionStorage.removeItem(DEMO_AUTH_KEY);
      setDemoLoggedIn(false);
    }
  };

  if (!authReady) {
    return <LoadingState message="Loading MedSync…" />;
  }

  if (!isAuthenticated) {
    return <LoginPage onDemoLogin={handleDemoLogin} />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={handleLogout} />}>
        <Route index element={<DashboardPage />} />
        <Route path="hospitals" element={<HospitalsPage />} />
        <Route path="resource-exchange" element={<ResourceExchangePage />} />
        <Route path="emergency-control" element={<EmergencyControlPage />} />
        <Route path="ambulance-network" element={<AmbulanceNetworkPage />} />
        <Route path="ai-predictions" element={<AIPredictionsPage />} />
        <Route path="water-quality" element={<WaterQualityPage />} />
        <Route path="iot-management" element={<IoTManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
