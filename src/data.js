export const HOSPITALS = [
  { id: 1, name: "City General Hospital",      beds: 450, occupied: 378, icu: 32, icuUsed: 28, status: "critical", region: "North"   },
  { id: 2, name: "St. Mary's Medical Center",  beds: 320, occupied: 241, icu: 24, icuUsed: 18, status: "stable",   region: "South"   },
  { id: 3, name: "Regional Trauma Center",     beds: 180, occupied: 162, icu: 16, icuUsed: 15, status: "warning",  region: "East"    },
  { id: 4, name: "Children's Healthcare Hub",  beds: 220, occupied: 145, icu: 20, icuUsed:  9, status: "stable",   region: "West"    },
  { id: 5, name: "University Medical Complex", beds: 600, occupied: 487, icu: 48, icuUsed: 41, status: "warning",  region: "Central" },
];

export const AMBULANCES = [
  { id: "AMB-001", status: "active",    location: "North District",     eta: "4 min",  crew: "Dr. Ramos + Patel", load: "Critical" },
  { id: "AMB-002", status: "standby",   location: "Station 7",          eta: "—",      crew: "Dr. Kim + Singh",   load: "—"        },
  { id: "AMB-003", status: "active",    location: "Highway 40 Exit 12", eta: "11 min", crew: "Paramedic Chen",    load: "Stable"   },
  { id: "AMB-004", status: "returning", location: "City General",        eta: "2 min",  crew: "Dr. Okafor + Liu",  load: "—"        },
  { id: "AMB-005", status: "standby",   location: "Station 3",          eta: "—",      crew: "Paramedic Torres",  load: "—"        },
];

export const RESOURCES = [
  { id: 1, item: "Ventilators",        from: "City General",       to: "Regional Trauma", qty: 5,  status: "in-transit", urgent: true  },
  { id: 2, item: "Blood (O-Neg)",      from: "Blood Bank Central", to: "St. Mary's",      qty: 12, status: "approved",   urgent: true  },
  { id: 3, item: "Portable ECG Units", from: "University Medical", to: "Children's Hub",  qty: 3,  status: "pending",    urgent: false },
  { id: 4, item: "Dialysis Equipment", from: "Renal Center North", to: "City General",    qty: 2,  status: "in-transit", urgent: false },
];

export const WATER_SENSORS = [
  { zone: "Hospital Zone A", ph: 7.2, turbidity: 0.4, tds: 312, temp: 22.3, contamIndex: 0.12, status: "safe"    },
  { zone: "Hospital Zone B", ph: 6.8, turbidity: 1.8, tds: 480, temp: 24.1, contamIndex: 0.68, status: "warning" },
  { zone: "ICU Water Supply", ph: 7.1, turbidity: 0.2, tds: 280, temp: 21.8, contamIndex: 0.08, status: "safe"   },
  { zone: "Surgical Block",   ph: 7.4, turbidity: 0.3, tds: 295, temp: 22.0, contamIndex: 0.09, status: "safe"   },
];

export const IOT_DEVICES = [
  { id: "SEN-001", type: "Water pH",    zone: "Zone A",   battery: 87, signal: "Strong", lastPing: "12s ago", status: "online"  },
  { id: "SEN-002", type: "Air Quality", zone: "ICU",      battery: 64, signal: "Strong", lastPing: "8s ago",  status: "online"  },
  { id: "SEN-003", type: "Temperature", zone: "Zone B",   battery: 22, signal: "Weak",   lastPing: "45s ago", status: "warning" },
  { id: "SEN-004", type: "Turbidity",   zone: "Surgical", battery: 91, signal: "Strong", lastPing: "5s ago",  status: "online"  },
  { id: "SEN-005", type: "TDS",         zone: "Zone B",   battery:  0, signal: "None",   lastPing: "8m ago",  status: "offline" },
];

export const ALERTS = [
  { id: 1, level: "critical", msg: "ICU capacity at 95% — Regional Trauma Center",        time: "2m ago"  },
  { id: 2, level: "warning",  msg: "Water contamination risk detected — Hospital Zone B",  time: "5m ago"  },
  { id: 3, level: "info",     msg: "Ventilator transfer confirmed — City General → Trauma", time: "12m ago" },
  { id: 4, level: "critical", msg: "Ambulance AMB-003 rerouted — accident on Highway 40",  time: "18m ago" },
  { id: 5, level: "warning",  msg: "SEN-005 sensor offline — Zone B TDS unmonitored",      time: "21m ago" },
];

export const AI_PREDICTIONS = [
  { label: "Patient Inflow Surge",       confidence: 87, horizon: "Next 4 hours",  risk: "high",   site: "City General"        },
  { label: "ICU Overflow Risk",          confidence: 92, horizon: "Next 2 hours",  risk: "high",   site: "Regional Trauma"     },
  { label: "Water Contamination Spread", confidence: 74, horizon: "Next 12 hours", risk: "medium", site: "Hospital Zone B"     },
  { label: "Resource Shortage — O2",     confidence: 68, horizon: "Next 24 hours", risk: "medium", site: "University Medical"  },
  { label: "Ambulance Route Delay",      confidence: 81, horizon: "Next 1 hour",   risk: "low",    site: "North District"      },
];
