from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from core.auth import get_current_user
from services.supabase_client import supabase
from services.nvidia_ai import get_nvidia_chat_response

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    subjectId: str
    sessionId: str = ""
    history: List[ChatMessage] = []
    attachedFileName: Optional[str] = None

@router.post("")
def send_chat_message(request: ChatRequest, user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    # 1. Check user exists
    user_result = supabase().table("users").select(
        "id, is_paid"
    ).eq("auth_id", uid).single().execute()
    
    if not user_result.data:
        raise HTTPException(status_code=403, detail="User not found")
    
    # 2. Get subject full name for context
    subject_name = request.subjectId
    
    subject_result = supabase().table("subjects").select(
        "name, full_name"
    ).eq("id", request.subjectId).single().execute()
    
    if subject_result.data:
        subject_name = subject_result.data.get("full_name", subject_name)
    
    # 3. Build the user message (include file info if attached)
    user_message = request.message
    if request.attachedFileName:
        user_message = f"[Attached file: {request.attachedFileName}]\n\n{request.message}"
    
    # 4. Generate response using NVIDIA NIM API (DiffusionGemma 26B)
    response_data = get_nvidia_chat_response(
        subject_name=subject_name,
        message=user_message,
        context="",
        history=[h.model_dump() for h in request.history]
    )
    
    # 5. Store messages in Supabase (only if sessionId provided)
    if request.sessionId:
        user_db_id = user_result.data["id"]
        
        supabase().table("chat_messages").insert([
            {
                "session_id": request.sessionId,
                "role": "user",
                "content": request.message,
            },
            {
                "session_id": request.sessionId,
                "role": "bot",
                "content": response_data["reply"],
                "sources": response_data.get("sources", []),
            }
        ]).execute()
    
    return response_data

@router.get("/history/{session_id}")
def get_chat_history(session_id: str, user: dict = Depends(get_current_user)):
    result = supabase().table("chat_messages").select(
        "role, content, sources, created_at"
    ).eq("session_id", session_id).order("created_at").execute()
    
    return {"messages": result.data or []}

class NewSessionRequest(BaseModel):
    subjectId: str

@router.post("/new-session")
def new_chat_session(req: NewSessionRequest, user: dict = Depends(get_current_user)):
    uid = user.get("sub")
    
    # Get internal user ID
    user_result = supabase().table("users").select("id").eq("auth_id", uid).single().execute()
    if not user_result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    result = supabase().table("chat_sessions").insert({
        "user_id": user_result.data["id"],
        "subject_id": req.subjectId,
        "year": "2025-26",
        "semester": "sem1",
    }).execute()
    
    return {"sessionId": result.data[0]["id"]}
