from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.models import LessonItem, LessonPreview # Added LessonPreview
from app.utils import load_lessons_data # Renamed from load_services

router = APIRouter(
    prefix="/lessons", # Renamed from /services
    tags=["Lessons"], # Renamed from Services
)


@router.get("", response_model=List[LessonPreview]) # Changed to LessonPreview
def get_lessons(lang: str = Query("en", description="Language code (e.g., 'en', 'ru')")): # Renamed from get_services
    """Get all lessons""" # Renamed from Get all services
    lessons = load_lessons_data(lang=lang) # Renamed from services, load_services
    if not lessons:
        raise HTTPException(status_code=404, detail=f"Lessons not found for language: {lang}") # Renamed from Services
    
    # Transform LessonItem to LessonPreview format
    lesson_previews = []
    for lesson in lessons:
        preview = LessonPreview(
            image_url=f"/images/lessons/{lesson.id}.jpg",  # Generate image path
            chips=[lesson.title.split()[0]],  # Use first word as chip
            caption=f"{lesson.title} for {lesson.description.split(',')[0]}"  # Create caption
        )
        lesson_previews.append(preview)
    
    return lesson_previews