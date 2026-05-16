from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/hospitals", tags=["hospitals"])


class HospitalSummary(BaseModel):
    id: str
    name: str
    city: str
    icu_beds_total: int
    icu_beds_available: int
    occupancy_percent: float = Field(ge=0, le=100)


# Seed data until Supabase is wired
_MOCK_HOSPITALS: list[HospitalSummary] = [
    HospitalSummary(
        id="hosp-001",
        name="City General Hospital",
        city="Mumbai",
        icu_beds_total=40,
        icu_beds_available=3,
        occupancy_percent=92.5,
    ),
    HospitalSummary(
        id="hosp-002",
        name="Metro Care Center",
        city="Pune",
        icu_beds_total=28,
        icu_beds_available=9,
        occupancy_percent=67.9,
    ),
    HospitalSummary(
        id="hosp-003",
        name="Riverside Medical",
        city="Nashik",
        icu_beds_total=22,
        icu_beds_available=14,
        occupancy_percent=36.4,
    ),
]


@router.get("", response_model=list[HospitalSummary])
def list_hospitals():
    return _MOCK_HOSPITALS


@router.get("/{hospital_id}", response_model=HospitalSummary)
def get_hospital(hospital_id: str):
    for hospital in _MOCK_HOSPITALS:
        if hospital.id == hospital_id:
            return hospital
    from fastapi import HTTPException

    raise HTTPException(status_code=404, detail="Hospital not found")
