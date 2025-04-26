from typing import List
from fastapi import APIRouter, HTTPException
from app.models import LessonPreview
from app.utils import load_lessons

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"],
)


@router.get("", response_model=List[LessonPreview])
def get_lessons():
    """Get all lesson previews"""
    lesson_previews = load_lessons()
    if not lesson_previews:
        raise HTTPException(status_code=404, detail="Lesson previews not found")
    return lesson_previews