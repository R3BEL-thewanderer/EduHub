from services.supabase_client import supabase

BUCKET_NAME = "eduhub-notes"

def generate_signed_url(file_path: str, expiration_seconds: int = 3600, download: bool = False) -> str:
    """Generate a signed URL for a file in Supabase Storage."""
    client = supabase()
    
    options = {"transform": None}
    if download:
        options["download"] = True
    
    result = client.storage.from_(BUCKET_NAME).create_signed_url(
        file_path, 
        expiration_seconds
    )
    
    if result and "signedURL" in result:
        return result["signedURL"]
    
    # Fallback: try the dict key format
    if isinstance(result, dict) and result.get("signedUrl"):
        return result["signedUrl"]
    
    raise Exception(f"Failed to generate signed URL for {file_path}")

def upload_file(file_path: str, file_content: bytes, content_type: str = "application/pdf") -> str:
    """Upload a file to Supabase Storage. Returns the storage path."""
    client = supabase()
    
    result = client.storage.from_(BUCKET_NAME).upload(
        file_path,
        file_content,
        {"content-type": content_type}
    )
    
    return file_path

def delete_file(file_path: str) -> bool:
    """Delete a file from Supabase Storage."""
    client = supabase()
    client.storage.from_(BUCKET_NAME).remove([file_path])
    return True

def list_files(folder_path: str) -> list:
    """List files in a Supabase Storage folder."""
    client = supabase()
    result = client.storage.from_(BUCKET_NAME).list(folder_path)
    return result or []
