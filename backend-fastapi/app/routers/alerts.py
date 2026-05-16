from datetime import datetime, timezone
from enum import Enum

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/alerts", tags=["alerts"])


class AlertSeverity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class Alert(BaseModel):
    id: str
    hospital_id: str
    title: str
    message: str
    severity: AlertSeverity
    created_at: datetime


class CreateAlertRequest(BaseModel):
    hospital_id: str
    title: str
    message: str
    severity: AlertSeverity = AlertSeverity.medium


_MOCK_ALERTS: list[Alert] = [
    Alert(
        id="alert-001",
        hospital_id="hosp-001",
        title="ICU capacity critical",
        message="ICU occupancy at 92%. Predicted overload in ~2 hours.",
        severity=AlertSeverity.critical,
        created_at=datetime(2026, 5, 16, 8, 30, tzinfo=timezone.utc),
    ),
    Alert(
        id="alert-002",
        hospital_id="hosp-002",
        title="Medicine stock low",
        message="Oxygen cylinder inventory below safety threshold.",
        severity=AlertSeverity.high,
        created_at=datetime(2026, 5, 16, 7, 15, tzinfo=timezone.utc),
    ),
]


@router.get("", response_model=list[Alert])
def list_alerts():
    return sorted(_MOCK_ALERTS, key=lambda a: a.created_at, reverse=True)


@router.post("", response_model=Alert, status_code=201)
def create_alert(body: CreateAlertRequest):
    alert = Alert(
        id=f"alert-{len(_MOCK_ALERTS) + 1:03d}",
        hospital_id=body.hospital_id,
        title=body.title,
        message=body.message,
        severity=body.severity,
        created_at=datetime.now(timezone.utc),
    )
    _MOCK_ALERTS.append(alert)
    return alert
