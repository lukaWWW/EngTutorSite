from fastapi import APIRouter, HTTPException, Query
from app.models import AboutResponse
from app.utils import load_about

router = APIRouter(
    prefix="/about",
    tags=["About"],
)


@router.get("", response_model=AboutResponse)
def get_about(lang: str = Query("en", description="Language code (e.g., 'en', 'ru')")):
    """Get the about page content"""
    content = load_about(lang=lang)
    if not content:
        raise HTTPException(status_code=404, detail=f"About content not found for language: {lang}")
    return AboutResponse(content=content)