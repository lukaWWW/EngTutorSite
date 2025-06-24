from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.models import FAQItem
from app.utils import load_faq

router = APIRouter(
    prefix="/faq",
    tags=["FAQ"],
)


@router.get("", response_model=List[FAQItem])
def get_faq(lang: str = Query("en", description="Language code (e.g., 'en', 'ru')")):
    """Get all FAQ items"""
    faq_items = load_faq(lang=lang)
    if not faq_items:
        raise HTTPException(status_code=404, detail=f"FAQ items not found for language: {lang}")
    return faq_items