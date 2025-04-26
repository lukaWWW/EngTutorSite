from fastapi import APIRouter, HTTPException
from app.models import AboutResponse
from app.utils import load_about

router = APIRouter(
    prefix="/about",
    tags=["About"],
)


@router.get("", response_model=AboutResponse)
def get_about():
    """Get the about page content"""
    content = load_about()
    if not content:
        raise HTTPException(status_code=404, detail="About content not found")
    return AboutResponse(content=content)