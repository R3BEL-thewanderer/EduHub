import requests
from core.config import settings

NVIDIA_INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"
MODEL = "google/diffusiongemma-26b-a4b-it"


def get_nvidia_chat_response(
    subject_name: str,
    message: str,
    context: str = "",
    history: list = None,
) -> dict:
    """
    Sends a chat request to the NVIDIA NIM endpoint (DiffusionGemma 26B).
    The API key is stored server-side only — never exposed to the frontend.
    """
    api_key = settings.NVIDIA_API_KEY
    if not api_key:
        return {"reply": "AI service is not configured. Please set NVIDIA_API_KEY.", "sources": []}

    # Build the system prompt
    system_prompt = (
        f"You are an expert AI study tutor on EduHub, a platform for first-year B.E. students. "
        f"The student is currently studying {subject_name}. "
        "Answer questions clearly, concisely, and in a student-friendly way. "
        "Use examples and analogies when helpful. "
        "If the student attaches a file description, analyze and explain its contents. "
        "Format your answers with markdown for readability (bold, bullet points, code blocks, etc.)."
    )

    if context:
        system_prompt += f"\n\nContext from {subject_name} notes:\n{context}"

    # Build message history for the API
    messages = [{"role": "system", "content": system_prompt}]

    if history:
        for msg in history:
            role = msg.get("role", "user")
            # Map 'bot' role to 'assistant' for the API
            if role == "bot":
                role = "assistant"
            messages.append({"role": role, "content": msg.get("content", "")})

    # Add the current user message
    messages.append({"role": "user", "content": message})

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": messages,
        "max_tokens": 4096,
        "temperature": 0.85,
        "top_p": 0.95,
        "stream": False,
        "chat_template_kwargs": {"enable_thinking": True},
    }

    try:
        response = requests.post(NVIDIA_INVOKE_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()

        # Extract the assistant reply from the NVIDIA response
        choices = data.get("choices", [])
        if choices:
            reply = choices[0].get("message", {}).get("content", "")
        else:
            reply = "I couldn't generate a response. Please try again."

        return {"reply": reply, "sources": []}

    except requests.exceptions.Timeout:
        return {"reply": "The AI is taking too long to respond. Please try again.", "sources": []}
    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code if e.response else 500
        if status_code == 401:
            return {"reply": "AI authentication failed. The API key may be invalid.", "sources": []}
        elif status_code == 429:
            return {"reply": "Too many requests. Please wait a moment and try again.", "sources": []}
        else:
            return {"reply": f"AI service error (HTTP {status_code}). Please try again later.", "sources": []}
    except Exception:
        return {"reply": "An unexpected error occurred with the AI service.", "sources": []}
