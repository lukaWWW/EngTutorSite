import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import routers
from app.routers import about, services, testimonials, faq, lessons

# Create FastAPI app
app = FastAPI(
    title="English Tutor API",
    description="API for the English Tutor Website",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development frontend
        "http://127.0.0.1:3000",  # Alternative development frontend
        "https://your-production-domain.com",  # Update with your production domain
    ],
    allow_credentials=True,
    allow_methods=["GET"],  # Only allow GET requests for this content API
    allow_headers=["*"],
)

# Include routers
app.include_router(about.router)
app.include_router(services.router)
app.include_router(testimonials.router)
app.include_router(faq.router)
app.include_router(lessons.router)

# Mount static files directory
content_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "content")
app.mount("/content", StaticFiles(directory=content_dir), name="content")


@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "name": "English Tutor API",
        "version": "1.0.0",
        "description": "API for the English Tutor Website",
        "endpoints": [
            "/about",
            "/services",
            "/testimonials",
            "/faq",
            "/lessons",
        ]
    }