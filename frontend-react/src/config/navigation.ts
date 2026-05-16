export const APP_NAME = "MedSync";
export const APP_TAGLINE = "Mission Control";

export type NavItem = {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
};

/** Sidebar items — matches mission-control modules */
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Dashboard", icon: "📊", end: true },
  { to: "/hospitals", label: "Hospitals", icon: "🏥" },
  { to: "/resource-exchange", label: "Resource Exchange", icon: "🔄" },
  { to: "/emergency-control", label: "Emergency Control", icon: "🚨" },
  { to: "/ambulance-network", label: "Ambulance Network", icon: "🚑" },
  { to: "/ai-predictions", label: "AI Predictions", icon: "🤖" },
  { to: "/water-quality", label: "Water Quality", icon: "💧" },
  { to: "/iot-management", label: "IoT Management", icon: "📡" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export const PAGE_TITLES: Record<string, string> = {
  "/": "Mission Control Dashboard",
  "/hospitals": "Hospital Management",
  "/resource-exchange": "Resource Exchange",
  "/emergency-control": "Emergency Control",
  "/ambulance-network": "Ambulance Network",
  "/ai-predictions": "AI Predictive Analytics",
  "/water-quality": "Water Quality Monitoring",
  "/iot-management": "IoT Sensor Management",
  "/settings": "System Settings",
};

export const PAGE_SUBTITLES: Record<string, string> = {
  "/": "National healthcare coordination — live system overview",
  "/hospitals": "Monitor all connected hospitals in real time",
  "/resource-exchange": "Track and manage inter-hospital resource transfers",
  "/emergency-control": "Live emergency case management and response coordination",
  "/ambulance-network": "Fleet tracking and dispatch coordination",
  "/ai-predictions": "Machine-learning forecasts for healthcare and environment",
  "/water-quality": "Real-time hospital water safety sensors",
  "/iot-management": "Connected devices, health status and analytics",
  "/settings": "System configuration and preferences",
};
