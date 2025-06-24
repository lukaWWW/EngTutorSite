from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.models import Testimonial
from app.utils import load_testimonials

router = APIRouter(
    prefix="/testimonials",
    tags=["Testimonials"],
)


@router.get("", response_model=List[Testimonial])
def get_testimonials(lang: str = Query("en", description="Language code (e.g., 'en', 'ru')")):
    """Get all testimonials"""
    testimonials = load_testimonials(lang=lang)
    if not testimonials:
        raise HTTPException(status_code=404, detail=f"Testimonials not found for language: {lang}")
    return testimonials