from typing import List
from fastapi import APIRouter, HTTPException
from app.models import Testimonial
from app.utils import load_testimonials

router = APIRouter(
    prefix="/testimonials",
    tags=["Testimonials"],
)


@router.get("", response_model=List[Testimonial])
def get_testimonials():
    """Get all testimonials"""
    testimonials = load_testimonials()
    if not testimonials:
        raise HTTPException(status_code=404, detail="Testimonials not found")
    return testimonials