import os
import json
from typing import List, Dict, Optional, Any

# Define the base directory relative to this file (backend/app)
APP_DIR = os.path.dirname(os.path.abspath(__file__))
# Define the content directory relative to the app directory, pointing to the backend content
CONTENT_DIR = os.path.abspath(os.path.join(APP_DIR, "..", "content"))

def get_localized_path(filename: str, lang: str) -> str:
    """Helper function to get the path to a localized file."""
    if lang == "en":
        return os.path.join(CONTENT_DIR, filename)
    
    base, ext = os.path.splitext(filename)
    localized_filename = f"{base}.{lang}{ext}"
    localized_file_path = os.path.join(CONTENT_DIR, localized_filename)
    
    # Fallback to English if the localized file doesn't exist
    if os.path.exists(localized_file_path):
        return localized_file_path
    return os.path.join(CONTENT_DIR, filename)

def load_about(lang: str = "en") -> Optional[str]:
    """Load raw about content from Markdown file based on language."""
    try:
        file_path = get_localized_path("about.md", lang)
        with open(file_path, "r", encoding="utf-8") as file:
            md_content = file.read()
            return md_content
    except FileNotFoundError:
        print(f"Error: About file not found for lang '{lang}' at {file_path}")
        return None
    except Exception as e:
        print(f"Error loading about content for lang '{lang}': {e}")
        return None

def load_lessons_data(lang: str = "en") -> List[Dict[str, str]]:
    """Load lessons data from JSON file based on language."""
    try:
        file_path = get_localized_path("lessons.json", lang)
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading lessons data for lang '{lang}': {e}")
        return []

def load_pricing() -> List[Dict[str, Any]]:
    """Load pricing plans from JSON file"""
    try:
        # This function currently does not support localization
        with open(os.path.join(CONTENT_DIR, "pricing.json"), "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading pricing: {e}")
        return []

def load_testimonials(lang: str = "en") -> List[Dict[str, str]]:
    """Load testimonials from JSON file based on language."""
    try:
        file_path = get_localized_path("testimonials.json", lang)
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading testimonials for lang '{lang}': {e}")
        return []

def load_faq(lang: str = "en") -> List[Dict[str, str]]:
    """Load FAQ items from JSON file based on language."""
    try:
        file_path = get_localized_path("faq.json", lang)
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: FAQ file not found for lang '{lang}' at {file_path}")
        return []
    except Exception as e:
        print(f"Error loading FAQ for lang '{lang}': {e}")
        return []