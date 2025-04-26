import os
import json
from typing import List, Dict, Optional, Any

# Define the base directory relative to this file (backend/app)
APP_DIR = os.path.dirname(os.path.abspath(__file__))
# Define the content directory relative to the app directory, pointing to the backend content
CONTENT_DIR = os.path.abspath(os.path.join(APP_DIR, "..", "content"))

def load_about() -> Optional[str]:
    """Load raw about content from Markdown file"""
    try:
        file_path = os.path.join(CONTENT_DIR, "about.md")
        with open(file_path, "r", encoding="utf-8") as file:
            md_content = file.read()
            # Return raw Markdown content
            return md_content
    except FileNotFoundError:
        print(f"Error: About file not found at {file_path}")
        return None
    except Exception as e:
        print(f"Error loading about content: {e}")
        return None

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
        file_path = os.path.join(CONTENT_DIR, "faq.json")
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: FAQ file not found at {file_path}")
        return []
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