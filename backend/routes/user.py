from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from core.auth import get_current_user
from services.supabase_client import supabase

router = APIRouter()

@router.get("/profile")
def get_profile(user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    result = supabase().table("users").select("*").eq("auth_id", uid).single().execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result.data

class UpdateProfileRequest(BaseModel):
    displayName: str

@router.patch("/profile")
def update_profile(req: UpdateProfileRequest, user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    supabase().table("users").update({
        "display_name": req.displayName
    }).eq("auth_id", uid).execute()
    
    return {"success": True}

@router.delete("/account")
def delete_account(user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    # Delete user row (cascade will handle related records)
    supabase().table("users").delete().eq("auth_id", uid).execute()
    
    # Delete from Supabase Auth
    supabase().auth.admin.delete_user(uid)
    
    return {"success": True}

@router.get("/subscription")
def get_subscription(user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    result = supabase().table("users").select(
        "is_paid, plan, subscription_started_at, subscription_expires_at"
    ).eq("auth_id", uid).single().execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result.data
