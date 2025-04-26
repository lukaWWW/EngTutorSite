from typing import List, Optional
from pydantic import BaseModel


class AboutResponse(BaseModel):
    content: str


class ServiceItem(BaseModel):
    icon: str
    title: str
    description: str


class PricingPlan(BaseModel):
    name: str
    lessons: int
    price: float
    discount_pct: float


class Testimonial(BaseModel):
    quote: str
    author: str


class FAQItem(BaseModel):
    question: str
    answer: str


class LessonPreview(BaseModel):
    image_url: str
    chips: List[str]
    caption: str