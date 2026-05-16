const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface Hospital {
  id: string;
  name: string;
  city: string;
  icu_beds_total: number;
  icu_beds_available: number;
  occupancy_percent: number;
}

export interface Alert {
  id: string;
  hospital_id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  created_at: string;
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export function fetchHospitals(): Promise<Hospital[]> {
  return request<Hospital[]>("/api/hospitals");
}

export function fetchAlerts(): Promise<Alert[]> {
  return request<Alert[]>("/api/alerts");
}

export function fetchHealth(): Promise<{ status: string; service: string }> {
  return request("/health");
}
