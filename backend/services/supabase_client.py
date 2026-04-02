from supabase import create_client, Client
from core.config import settings

_client: Client = None

def get_supabase() -> Client:
    """Returns the Supabase admin client (service role key)."""
    global _client
    if _client is None:
        _client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_ROLE_KEY
        )
    return _client

# Convenience alias
supabase = get_supabase
