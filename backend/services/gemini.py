import google.generativeai as genai
from core.config import settings

_configured = False

def _ensure_configured():
    global _configured
    if not _configured and settings.GEMINI_API_KEY:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        _configured = True

def get_chat_response(subject_name: str, message: str, context: str = "", history: list = None):
    """
    Generate a chat response using the free Gemini API.
    
    Instead of Vertex AI RAG, we pass note content as context in the prompt.
    Free tier: 15 RPM, 1M tokens/day — more than enough for a college project.
    """
    _ensure_configured()
    
    model = genai.GenerativeModel("gemini-2.0-flash")
    
    system_instruction = (
        f"You are a study assistant for first-year B.E. students on EduHub. "
        f"Answer ONLY using the provided context from {subject_name} notes. "
        "If the answer is not in the notes, say: 'This topic isn't in your "
        "uploaded notes yet. Check back after more notes are added.' "
        "Never make up information. Keep answers concise and student-friendly."
    )
    
    # Build the prompt with context
    prompt_parts = [system_instruction + "\n\n"]
    
    if context:
        prompt_parts.append(f"Context from {subject_name} notes:\n{context}\n\n")
    
    prompt_parts.append(f"Student question: {message}")
    
    # Convert history to Gemini format
    gemini_history = []
    if history:
        for msg in history:
            role = "user" if msg.get("role") == "user" else "model"
            gemini_history.append({
                "role": role,
                "parts": [msg.get("content", "")]
            })
    
    chat = model.start_chat(history=gemini_history)
    response = chat.send_message("".join(prompt_parts))
    
    return {
        "reply": response.text,
        "sources": []
    }
