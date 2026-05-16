import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AIPredictionsPage } from "./pages/AIPredictionsPage";
import { AmbulanceNetworkPage } from "./pages/AmbulanceNetworkPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EmergencyControlPage } from "./pages/EmergencyControlPage";
import { HospitalsPage } from "./pages/HospitalsPage";
import { IoTManagementPage } from "./pages/IoTManagementPage";
import { ResourceExchangePage } from "./pages/ResourceExchangePage";
import { SettingsPage } from "./pages/SettingsPage";
import { WaterQualityPage } from "./pages/WaterQualityPage";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
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
