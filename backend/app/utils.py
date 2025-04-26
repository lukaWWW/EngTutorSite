import json
import os
from typing import Dict, List, Any, Optional

# Get the absolute path to the content directory
CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "content")


def load_about() -> str:
    """Load the about page content from Markdown file"""
    try:
        with open(os.path.join(CONTENT_DIR, "about.md"), "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error loading about content: {e}")
        return ""


def load_services() -> List[Dict[str, str]]:
    """Load services from JSON file"""
    try:
        with open(os.path.join(CONTENT_DIR, "services.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading services: {e}")
        return []


def load_pricing() -> List[Dict[str, Any]]:
    """Load pricing plans from JSON file"""
    try:
        with open(os.path.join(CONTENT_DIR, "pricing.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading pricing: {e}")
        return []


def load_testimonials() -> List[Dict[str, str]]:
    """Load testimonials from JSON file"""
    try:
        with open(os.path.join(CONTENT_DIR, "testimonials.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading testimonials: {e}")
        return []


def load_faq() -> List[Dict[str, str]]:
    """Load FAQ items from JSON file"""
    try:
        with open(os.path.join(CONTENT_DIR, "faq.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading FAQ: {e}")
        return []


def load_lessons() -> List[Dict[str, Any]]:
    """Load lesson previews from JSON file"""
    try:
        with open(os.path.join(CONTENT_DIR, "lessons.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading lessons: {e}")
        return []