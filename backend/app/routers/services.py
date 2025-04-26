from typing import List
from fastapi import APIRouter, HTTPException
from app.models import ServiceItem
from app.utils import load_services

router = APIRouter(
    prefix="/services",
    tags=["Services"],
)


@router.get("", response_model=List[ServiceItem])
def get_services():
    """Get all services"""
    services = load_services()
    if not services:
        raise HTTPException(status_code=404, detail="Services not found")
    return services