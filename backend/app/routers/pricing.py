from typing import List
from fastapi import APIRouter, HTTPException
from app.models import PricingPlan
from app.utils import load_pricing

router = APIRouter(
    prefix="/pricing",
    tags=["Pricing"],
)


@router.get("", response_model=List[PricingPlan])
def get_pricing():
    """Get all pricing plans"""
    pricing_plans = load_pricing()
    if not pricing_plans:
        raise HTTPException(status_code=404, detail="Pricing plans not found")
    return pricing_plans