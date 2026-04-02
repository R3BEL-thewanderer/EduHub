from fastapi import APIRouter, Depends
from core.auth import get_current_user
from services.supabase_client import supabase

router = APIRouter()

@router.get("/{year}/{semester}")
def get_subjects(year: str, semester: str):
    """Returns subject list for a given year/semester. Public API — no auth required."""
    result = supabase().table("subjects").select(
        "id, name, full_name, icon, description, is_locked, display_order, "
        "notes_count, pdfs_count, pyqs_count, videos_count, total_views"
    ).eq("year", year).eq("semester", semester).order("display_order").execute()
    
    return result.data or []

@router.get("/{year}/{semester}/{subject_id}")
def get_subject_detail(year: str, semester: str, subject_id: str):
    """Returns single subject details. Public API."""
    result = supabase().table("subjects").select("*").eq(
        "id", subject_id
    ).eq("year", year).eq("semester", semester).single().execute()
    
    if not result.data:
        return {"error": "Subject not found"}
    
    return result.data

@router.get("/{year}/{semester}/{subject_id}/files")
def get_subject_files(year: str, semester: str, subject_id: str, user: dict = Depends(get_current_user)):
    """Returns all files for a subject. Requires auth."""
    
    notes = supabase().table("files").select("*").eq(
        "subject_id", subject_id
    ).eq("year", year).eq("semester", semester).eq(
        "content_type", "notes"
    ).order("uploaded_at", desc=True).execute()
    
    pdfs = supabase().table("files").select("*").eq(
        "subject_id", subject_id
    ).eq("year", year).eq("semester", semester).eq(
        "content_type", "pdfs"
    ).order("uploaded_at", desc=True).execute()
    
    pyqs = supabase().table("files").select("*").eq(
        "subject_id", subject_id
    ).eq("year", year).eq("semester", semester).eq(
        "content_type", "pyqs"
    ).order("exam_year", desc=True).execute()
    
    videos = supabase().table("videos").select("*").eq(
        "subject_id", subject_id
    ).eq("year", year).eq("semester", semester).order("uploaded_at", desc=True).execute()
    
    return {
        "notes": notes.data or [],
        "pdfs": pdfs.data or [],
        "pyqs": pyqs.data or [],
        "videos": videos.data or [],
    }
