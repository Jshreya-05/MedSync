export const APP_NAME = "HEMS AI";
export const APP_TAGLINE = "Mission Control";

export type NavItem = {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
};

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
  "/": "Dashboard",
  "/hospitals": "Hospitals",
  "/resource-exchange": "Resource Exchange",
  "/emergency-control": "Emergency Control",
  "/ambulance-network": "Ambulance Network",
  "/ai-predictions": "AI Predictions",
  "/water-quality": "Water Quality",
  "/iot-management": "IoT Management",
  "/settings": "Settings",
};
