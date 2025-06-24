from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.models import LessonItem # Renamed from ServiceItem
from app.utils import load_lessons_data # Renamed from load_services

router = APIRouter(
    prefix="/lessons", # Renamed from /services
    tags=["Lessons"], # Renamed from Services
)


@router.get("", response_model=List[LessonItem]) # Renamed from ServiceItem
def get_lessons(lang: str = Query("en", description="Language code (e.g., 'en', 'ru')")): # Renamed from get_services
    """Get all lessons""" # Renamed from Get all services
    lessons = load_lessons_data(lang=lang) # Renamed from services, load_services
    if not lessons:
        raise HTTPException(status_code=404, detail=f"Lessons not found for language: {lang}") # Renamed from Services
    return lessons