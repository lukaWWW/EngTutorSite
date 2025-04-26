from typing import List
from fastapi import APIRouter, HTTPException
from app.models import FAQItem
from app.utils import load_faq

router = APIRouter(
    prefix="/faq",
    tags=["FAQ"],
)


@router.get("", response_model=List[FAQItem])
def get_faq():
    """Get all FAQ items"""
    faq_items = load_faq()
    if not faq_items:
        raise HTTPException(status_code=404, detail="FAQ items not found")
    return faq_items