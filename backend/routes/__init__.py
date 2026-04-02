from fastapi import APIRouter
from routes import files, chat, payment, admin, user, subjects

api_router = APIRouter()

api_router.include_router(files.router, prefix="/files", tags=["files"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(payment.router, prefix="/payment", tags=["payment"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(subjects.router, prefix="/subjects", tags=["subjects"])
