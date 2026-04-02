# 🛠️ TECHSTACK.md — TCET Notes Hub
**Platform:** 100% Free Tier — Supabase + Vercel + Render  
**Cost:** ₹0/month (all services on free tier)  

---

## Architecture Overview

```
[ User Browser ]
      |
      ▼
[ Vercel ]                ← Next.js 14 (App Router) — Frontend Hosting
      |
      ├──► [ Supabase Auth ]          → Email + Google OAuth Sign-In
      ├──► [ Supabase PostgreSQL ]    → DB: subjects, users, metadata
      ├──► [ Supabase Storage ]       → PDFs, Notes, PYQ files
      ├──► [ Render.com ]             → Backend API (Python FastAPI)
      │         ├──► Gemini AI       → Subject-wise chatbot (free API)
      │         └──► Razorpay API    → Payment webhook handler
      └──► [ Vercel Analytics ]      → Track user behavior (free)
```

---

## Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14+ (App Router) | Core framework — SSR, SSG, routing |
| **React** | 18+ | UI components |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3.4+ | Styling — no external CSS needed |
| **@supabase/supabase-js** | 2+ | Supabase client (auth, DB, storage) |
| **@supabase/ssr** | 0.1+ | Supabase SSR helpers for Next.js |
| **react-pdf** | 7+ | Inline PDF viewer (same-tab rendering) |
| **Framer Motion** | 10+ | Page transitions, animations |
| **React Icons** | 5+ | Icon library |
| **SWR** | 2+ | Data fetching + caching |

---

## Backend

| Technology | Purpose |
|---|---|
| **Render.com** (Free Tier) | Serverless Python API hosting (auto-deploys from GitHub) |
| **FastAPI** (Python 3.11) | REST API framework |
| **supabase-py** | Supabase Python client (DB + Auth + Storage) |
| **PyJWT** | Verify Supabase JWT tokens on backend |
| **google-generativeai** | Gemini AI free API for chatbot |
| **Razorpay Python SDK** | Payment verification |

---

## Free Tier Services Used

| Service | What It Does | Free Tier Limits |
|---|---|---|
| **Vercel** | Hosts Next.js with global CDN | 100GB bandwidth, 100K function invocations/day |
| **Supabase Auth** | Email + Google OAuth | 50,000 monthly active users |
| **Supabase PostgreSQL** | Database for all structured data | 500 MB database, unlimited API requests |
| **Supabase Storage** | Store PDFs, notes, PYQ files | 1 GB storage, 2 GB bandwidth/month |
| **Render.com** | Python FastAPI backend hosting | 750 hours/month, auto-sleep after 15min inactivity |
| **Gemini AI** (Free API) | AI chatbot per subject | 15 RPM (requests per minute), 1M tokens/day |
| **Vercel Analytics** | User tracking | Free tier included |

**Estimated Monthly Cost: ₹0 (all free tiers)**

> **Note on Render.com free tier:** The service spins down after 15 minutes of inactivity. First request after sleep takes ~30–50 seconds (cold start). Subsequent requests are fast. This is acceptable for a college project.

---

## Alternative Free Backend Hosts

If Render.com doesn't suit your needs, here are alternatives:

| Host | Free Tier | Language Support | Cold Start? |
|---|---|---|---|
| **Render.com** ✅ (recommended) | 750 hrs/month | Python, Node, Go, Rust | Yes (~30s) |
| **Railway** | $5 free credit/month | Python, Node, anything via Docker | No |
| **Koyeb** | 1 free nano service | Python, Node, Go, Docker | No |
| **Fly.io** | 3 shared VMs free | Docker (any language) | No |
| **Vercel API Routes** | Same as frontend | TypeScript/Node only | No (but serverless) |
| **Deta Space** | Unlimited free | Python, Node | No |

---

## Database — Supabase PostgreSQL Schema

```sql
-- Table: users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  college TEXT DEFAULT 'TCET',
  created_at TIMESTAMPTZ DEFAULT now(),
  last_active_at TIMESTAMPTZ DEFAULT now(),
  -- Subscription fields
  is_paid BOOLEAN DEFAULT false,
  plan TEXT CHECK (plan IN ('monthly', 'semester')),
  subscription_started_at TIMESTAMPTZ,
  subscription_expires_at TIMESTAMPTZ,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  -- AI usage tracking
  ai_messages_today INTEGER DEFAULT 0,
  ai_last_reset_at TIMESTAMPTZ DEFAULT now()
);

-- Table: subjects
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,           -- e.g., 'chemistry'
  year TEXT NOT NULL,            -- e.g., '2025-26'
  semester TEXT NOT NULL,        -- e.g., 'sem1'
  name TEXT NOT NULL,            -- e.g., 'Chemistry'
  full_name TEXT,                -- e.g., 'Engineering Chemistry'
  icon TEXT,                     -- e.g., '🧪'
  description TEXT,
  is_locked BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  -- Stats
  notes_count INTEGER DEFAULT 0,
  pdfs_count INTEGER DEFAULT 0,
  pyqs_count INTEGER DEFAULT 0,
  videos_count INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  UNIQUE(year, semester, id)
);

-- Table: files (notes, pdfs, pyqs)
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL REFERENCES subjects(id),
  year TEXT NOT NULL,
  semester TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('notes', 'pdfs', 'pyqs')),
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,    -- path in Supabase Storage bucket
  size_bytes BIGINT,
  mime_type TEXT DEFAULT 'application/pdf',
  exam_year TEXT,                -- for PYQs only, e.g., '2023-24'
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0
);

-- Table: videos
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL REFERENCES subjects(id),
  year TEXT NOT NULL,
  semester TEXT NOT NULL,
  title TEXT NOT NULL,
  video_type TEXT NOT NULL CHECK (video_type IN ('youtube', 'hosted')),
  youtube_url TEXT,              -- for YouTube embeds
  storage_path TEXT,             -- for hosted videos in Supabase Storage
  duration TEXT,                 -- e.g., '24:15'
  thumbnail_url TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  views INTEGER DEFAULT 0
);

-- Table: chat_sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL REFERENCES subjects(id),
  year TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_message_at TIMESTAMPTZ DEFAULT now()
);

-- Table: chat_messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'bot')),
  content TEXT NOT NULL,
  sources TEXT[],                -- note titles cited by AI
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  email TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('monthly', 'semester')),
  amount INTEGER NOT NULL,       -- in paise
  currency TEXT DEFAULT 'INR',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users: can only read/write own row
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = auth_id);

-- Subjects: all authenticated users can read
CREATE POLICY "Anyone can read subjects" ON subjects FOR SELECT USING (true);

-- Files: authenticated users can read
CREATE POLICY "Auth users can read files" ON files FOR SELECT USING (auth.role() = 'authenticated');

-- Videos: authenticated users can read
CREATE POLICY "Auth users can read videos" ON videos FOR SELECT USING (auth.role() = 'authenticated');

-- Chat sessions: own sessions only
CREATE POLICY "Users can read own sessions" ON chat_sessions FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can insert own sessions" ON chat_sessions FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Chat messages: own session messages only
CREATE POLICY "Users can read own messages" ON chat_messages FOR SELECT USING (session_id IN (SELECT id FROM chat_sessions WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())));
```

---

## Supabase Storage — Bucket Structure

```
Bucket: tcet-notes (private)
  ├── 2025-26/
  │     ├── sem1/
  │     │     ├── chemistry/
  │     │     │     ├── notes/
  │     │     │     ├── pdfs/
  │     │     │     └── pyqs/
  │     │     ├── physics/
  │     │     ├── maths1/
  │     │     ├── pps/
  │     │     ├── egd/
  │     │     ├── bee/
  │     │     └── egpc/
  │     └── sem2/
  │           └── maths2/
  └── videos/  (only self-recorded, not embeds)
```

**File Access Rules:**  
- Bucket is **private** (not public)
- Frontend requests a signed URL from Render.com backend API
- Signed URL generated via Supabase Storage `createSignedUrl()` — expires in **60 minutes**
- Ensures users must stay logged in + on your site (keeps ads visible)

---

## Gemini AI Setup (Free API — replaces Vertex AI RAG)

```python
# Backend: services/gemini.py
import google.generativeai as genai
from core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

def get_chat_response(subject_name: str, message: str, context: str = "", history: list = None):
    model = genai.GenerativeModel("gemini-2.0-flash")
    
    system_instruction = (
        f"You are a study assistant for TCET first-year B.E. students. "
        f"Answer ONLY using the provided context from {subject_name} notes. "
        "If the answer is not in the notes, say: 'This topic isn't in your "
        "uploaded notes yet. Check back after more notes are added.' "
        "Never make up information. Keep answers concise and student-friendly."
    )
    
    chat = model.start_chat(history=history or [])
    
    prompt = f"Context from {subject_name} notes:\n{context}\n\nStudent question: {message}"
    response = chat.send_message(prompt)
    
    return {
        "reply": response.text,
        "sources": []  # Can parse from response if context-based
    }
```

> **Note:** The free Gemini API does not have built-in RAG. For context-aware answers,
> the backend fetches relevant note content from Supabase and passes it as context
> in the prompt. This is simpler but works well for a college project.

---

## Payment — Razorpay Integration (unchanged)

| Plan | Price | Feature |
|---|---|---|
| Monthly | ₹49/month | Gemini AI chatbot access |
| Semester | ₹99/6 months | Same + priority response |

**Flow:**
1. User clicks "Unlock AI" → Razorpay checkout opens
2. On success → Razorpay webhook hits Render.com `/api/payment/verify`
3. Backend updates Supabase users table: `is_paid = true`
4. Frontend checks Supabase → unlocks AI chat widget per subject

---

## Environment Variables

### Frontend (Vercel Dashboard → Environment Variables)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
NEXT_PUBLIC_API_URL=https://tcet-api.onrender.com
```

### Backend (Render.com Dashboard → Environment Variables)
```env
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...   # Server-side key (NOT the anon key)
SUPABASE_JWT_SECRET=your-jwt-secret             # For verifying JWT tokens

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Admin
ADMIN_UID=   # Your Supabase user UUID

# Gemini AI (Free)
GEMINI_API_KEY=   # From https://aistudio.google.com/apikey (free)
```

---

## Dev Environment Setup

```bash
# Prerequisites
node >= 18
python >= 3.11
Supabase account (free at supabase.com)

# Frontend setup
npx create-next-app@latest tcet-notes-hub --typescript --tailwind --app
cd tcet-notes-hub
npm install @supabase/supabase-js @supabase/ssr react-pdf framer-motion react-icons swr

# Backend setup
mkdir backend && cd backend
pip install fastapi uvicorn supabase-py pyjwt google-generativeai razorpay python-dotenv pydantic-settings

# Supabase setup
# 1. Create project at supabase.com
# 2. Go to SQL Editor → run the schema above
# 3. Enable Google OAuth in Auth → Providers → Google
# 4. Create Storage bucket "tcet-notes" (private)
# 5. Copy URL + anon key + service role key

# Local dev
# Frontend: npm run dev
# Backend: uvicorn main:app --reload

# Deploy frontend to Vercel
# 1. Push to GitHub
# 2. Import project at vercel.com
# 3. Add env variables in Vercel dashboard
# 4. Auto-deploys on every push to main

# Deploy backend to Render.com
# 1. Push to GitHub
# 2. Create new Web Service at render.com
# 3. Connect GitHub repo → select /backend folder
# 4. Build command: pip install -r requirements.txt
# 5. Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
# 6. Add env variables in Render dashboard
# 7. Auto-deploys on every push to main
```

---

## Folder Structure

```
tcet-notes-hub/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                  ← Homepage
│   │   ├── layout.tsx                ← Root layout (navbar + ad sidebars)
│   │   ├── [year]/
│   │   │   └── [semester]/
│   │   │       └── [subject]/
│   │   │           ├── page.tsx      ← Subject page (4 tabs)
│   │   │           └── chat/
│   │   │               └── page.tsx  ← AI chat (paid only)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/page.tsx     ← Supabase OAuth callback handler
│   │   ├── admin/
│   │   │   └── page.tsx              ← Admin upload panel
│   │   ├── privacy-policy/
│   │   ├── terms/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── AdSidebar.tsx
│   │   │   └── MobileDrawer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SubjectGrid.tsx
│   │   │   └── SubjectCard.tsx
│   │   ├── subject/
│   │   │   ├── ContentTabs.tsx
│   │   │   ├── FileList.tsx
│   │   │   ├── PDFViewer.tsx
│   │   │   └── VideoPlayer.tsx
│   │   ├── auth/
│   │   │   ├── LoginWall.tsx
│   │   │   └── AuthForm.tsx
│   │   ├── ai/
│   │   │   ├── AIChatWidget.tsx
│   │   │   └── AIPaywall.tsx
│   │   └── ui/
│   │       └── (reusable UI components)
│   │
│   ├── lib/
│   │   ├── supabase.ts              ← Supabase browser client
│   │   ├── supabase-server.ts       ← Supabase server client (SSR)
│   │   ├── api.ts                   ← Fetch wrappers for Render.com API
│   │   └── razorpay.ts              ← Razorpay checkout loader
│   │
│   ├── store/
│   │   └── authStore.ts             ← Zustand store
│   │
│   ├── middleware.ts                 ← Auth + admin route protection
│   ├── next.config.ts
│   └── package.json
│
├── backend/
│   ├── main.py                      ← FastAPI app entry
│   ├── routes/
│   │   ├── files.py                 ← /api/files/* (Supabase Storage signed URLs)
│   │   ├── chat.py                  ← /api/chat/* (Gemini AI free API)
│   │   ├── payment.py               ← /api/payment/* (Razorpay)
│   │   ├── admin.py                 ← /api/admin/*
│   │   ├── user.py                  ← /api/user/*
│   │   └── subjects.py              ← /api/subjects/*
│   ├── services/
│   │   ├── supabase_client.py       ← Supabase Python client init
│   │   ├── gemini.py                ← Gemini AI free API
│   │   └── razorpay_client.py       ← Payment operations
│   ├── core/
│   │   ├── auth.py                  ← Supabase JWT verification
│   │   └── config.py                ← Pydantic settings
│   ├── requirements.txt
│   └── render.yaml                  ← Render.com deployment config
│
└── README.md
```
