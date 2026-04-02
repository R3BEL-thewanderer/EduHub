from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from core.auth import get_current_user
from services.razorpay_client import razorpay_client, verify_payment_signature
from services.supabase_client import supabase
from core.config import settings
from datetime import datetime, timedelta

router = APIRouter()

class CreateOrderRequest(BaseModel):
    plan: str

@router.post("/create-order")
def create_order(request: CreateOrderRequest, user: dict = Depends(get_current_user)):
    amount = 4900 if request.plan == "monthly" else 9900
    
    order = razorpay_client.order.create(dict(
        amount=amount,
        currency="INR",
        payment_capture="1"
    ))
    
    return {
        "orderId": order["id"],
        "amount": amount,
        "currency": "INR",
        "keyId": settings.RAZORPAY_KEY_ID
    }

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    plan: str

@router.post("/verify")
def verify_payment(req: VerifyPaymentRequest, user: dict = Depends(get_current_user)):
    is_valid = verify_payment_signature(
        req.razorpay_order_id, 
        req.razorpay_payment_id, 
        req.razorpay_signature
    )
    
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    uid = user.get("sub")
    
    # Calculate expiration
    now = datetime.utcnow()
    if req.plan == "monthly":
        expires_at = now + timedelta(days=30)
    else:
        expires_at = now + timedelta(days=180)
    
    # Update user subscription in Supabase
    supabase().table("users").update({
        "is_paid": True,
        "plan": req.plan,
        "subscription_started_at": now.isoformat(),
        "subscription_expires_at": expires_at.isoformat(),
        "razorpay_payment_id": req.razorpay_payment_id,
        "razorpay_order_id": req.razorpay_order_id,
    }).eq("auth_id", uid).execute()
    
    # Record payment
    user_result = supabase().table("users").select("id, email").eq("auth_id", uid).single().execute()
    if user_result.data:
        supabase().table("payments").insert({
            "user_id": user_result.data["id"],
            "email": user_result.data["email"],
            "plan": req.plan,
            "amount": 4900 if req.plan == "monthly" else 9900,
            "razorpay_order_id": req.razorpay_order_id,
            "razorpay_payment_id": req.razorpay_payment_id,
            "status": "paid",
            "paid_at": now.isoformat(),
        }).execute()
    
    return {"success": True}

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature")
    
    try:
        razorpay_client.utility.verify_webhook_signature(
            body.decode("utf-8"), 
            signature, 
            settings.RAZORPAY_WEBHOOK_SECRET
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")
    
    # Process event
    event = await request.json()
    # TODO: Handle payment.captured, subscription.charged events
    return {"status": "ok"}
