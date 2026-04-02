
╔══════════════════════════════════════════════════════════════════╗
║         PRODUCT REQUIREMENTS DOCUMENT — FULLSTACK                ║
║         TCET Notes Hub — Production Deployment                   ║
║         Version: 3.0 FINAL  |  March 2026                       ║
║         Stack: Supabase + Vercel + Render (Free Tier)            ║
╚══════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 1 — PRODUCT OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Name    : TCET Notes Hub
Domain          : tcetnotes.in (or .com)
Type            : Full-Stack Web Application
Infrastructure  : 100% Free Tier — Supabase + Vercel + Render
Target Users    : First Year B.E. Students — TCET Mumbai
Monetization    : Google AdSense + Razorpay Subscriptions
AI Feature      : Gemini AI (Free API) per subject chatbot
Deployment      : Vercel (Frontend) + Render.com (Backend API)
Database/Auth   : Supabase (PostgreSQL + Auth + Storage)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 2 — COMPLETE SYSTEM ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────────┐
│                  Vercel (Next.js 14)                             │
│          Global CDN  |  SSR + SSG + ISR  |  Edge Cache          │
└───┬─────────────┬──────────────┬──────────────┬─────────────────┘
    │             │              │              │
    ▼             ▼              ▼              ▼
Supabase       Supabase      Render.com     Vercel
  Auth        PostgreSQL    (API Layer)    Analytics
(Email +       (DB for      (FastAPI /     (user events,
 Google        metadata,     Python 3.11)   page views)
 OAuth)        users,           │
               subjects)   ┌────┴──────────────────┐
                            │                       │
                     Supabase Storage         Gemini AI
                    (PDFs, Notes,           (Free API)
                     PYQs)                  gemini-2.0-flash
                            │                       │
                     Signed URLs            Subject context
                    (60-min expiry)         passed in prompt


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 3 — FRONTEND SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRAMEWORK      : Next.js 14 (App Router)
LANGUAGE       : TypeScript
STYLING        : Tailwind CSS
ANIMATIONS     : Framer Motion
PDF RENDERING  : react-pdf (PDF.js under the hood)
DATA FETCHING  : SWR (stale-while-revalidate)
STATE MGMT     : Zustand (global auth + subscription state)
FORMS          : React Hook Form + Zod (validation)
AUTH CLIENT    : @supabase/supabase-js + @supabase/ssr
PAYMENTS UI    : Razorpay JS SDK
ICONS          : Lucide React

3.1 — ALL PAGES & ROUTES
─────────────────────────
/                              Homepage
/auth/login                    Login
/auth/signup                   Signup
/auth/callback                 Supabase OAuth callback handler
/[year]/[semester]/            Subjects Grid
/[year]/[semester]/[subject]/  Subject Page (4 tabs)
/[year]/[semester]/[subject]/chat   AI Chat (paid only)
/profile                       User Profile + subscription
/admin                         Admin Panel (your UID only)
/admin/upload                  File Upload Interface
/admin/users                   User Management
/admin/analytics               Traffic + Revenue Dashboard
/privacy-policy                Legal (AdSense requirement)
/terms                         Legal (payment requirement)
/refund-policy                 Legal (Razorpay requirement)
/about                         About (AdSense requirement)
/contact                       Contact (AdSense requirement)
/404                           Not Found

3.2 — RENDERING STRATEGY PER PAGE
───────────────────────────────────
Homepage           → SSG  (rebuilt on every deploy)
Subject Grid       → ISR  (revalidate every 60s)
Subject Page       → ISR  (revalidate every 30s)
Auth Pages         → CSR  (no SEO needed)
Auth Callback      → CSR  (Supabase OAuth redirect handler)
Profile Page       → CSR  (user-specific)
Admin Pages        → CSR  (protected, no index)
Legal Pages        → SSG  (static, never changes)

3.3 — SEO METADATA (per page)
──────────────────────────────
Homepage:
  title: "TCET Notes Hub — Free Notes for First Year B.E."
  description: "Free notes, PDFs, PYQs and video lectures
                for TCET first year B.E. students. Chemistry,
                Physics, Maths, PPS, EGD, BEE and EGPC."
  og:image: /og-image.png (1200×630)
  keywords: TCET notes, TCET first year, engineering notes
            Mumbai, B.E. notes 2025-26

Subject Pages:
  title: "[Subject] Notes — TCET Sem [X] 2025–26"
  description: "Study [Subject] with free notes, PDFs, PYQs
                and video lectures for TCET B.E. Sem [X]."

3.4 — AUTHENTICATION STATE (Zustand store)
───────────────────────────────────────────
Store shape:
{
  user: null | {
    id: string                  // Supabase user UUID (auth.users.id)
    email: string
    displayName: string
    photoURL: string | null
    subscription: {
      isPaid: boolean
      plan: "monthly" | "semester" | null
      expiresAt: Date | null
    }
  }
  isLoading: boolean
  setUser: (user) => void
  clearUser: () => void
}

On app load:
  1. Supabase onAuthStateChange fires
  2. If session exists → fetch user profile from Supabase `users` table
  3. Populate Zustand store with user + subscription data
  4. All components read from store (no prop drilling)

Supabase Auth Setup (frontend):
  ```typescript
  // lib/supabase.ts
  import { createBrowserClient } from '@supabase/ssr'
  
  export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  ```

Google OAuth Login:
  ```typescript
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` }
  })
  ```

Email/Password Login:
  ```typescript
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  })
  ```

Email/Password Signup:
  ```typescript
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { display_name: fullName } }
  })
  ```

OAuth Callback Page (/auth/callback):
  ```typescript
  // app/auth/callback/page.tsx
  // This page handles the redirect after Google OAuth
  // Supabase exchanges the code for a session automatically
  // Then redirect user to the page they came from
  ```

3.5 — PROTECTED ROUTE LOGIC
─────────────────────────────
File/Video Access:
  IF user === null → show LoginWall component (not redirect)
  IF user exists → call /api/files/signed-url endpoint on Render.com
  → render content inline (react-pdf or video player)

Admin Routes:
  IF user.id !== ADMIN_UID → redirect to /
  Check done in Next.js middleware (middleware.ts)
  Middleware reads Supabase session from cookies

AI Chat Route:
  IF !user.subscription.isPaid → show PaywallWidget
  IF subscription.expiresAt < now → show renewal prompt
  IF all good → render full chat interface

3.6 — PDF VIEWER (inline — critical for AdSense)
──────────────────────────────────────────────────
Implementation:
  - Use react-pdf to render PDF from a signed URL blob
  - PDF renders inside current page layout
  - Left + right ads remain visible during viewing
  - Controls: prev page / page X of Y / next page /
              zoom in / zoom out / download button
  - On mobile: full-width, scrollable page-by-page
  - NEVER use window.open() or target="_blank"
  - Signed URL fetched from Render.com API every time user clicks View
    (Supabase Storage signed URLs, prevents bookmarking/sharing)

3.7 — VIDEO PLAYER
────────────────────
Two types:
  A. YouTube embed:
     → Render as <iframe> embed inside page layout
     → Use youtube-nocookie.com domain (privacy + ads)
     → Custom thumbnail shown before play

  B. Hosted video (Supabase Storage):
     → Fetch signed URL from /api/files/signed-url
     → Render as HTML5 <video> with controls
     → Streaming support via Supabase Storage

Both types: expand inline, never new tab, ads visible.

3.8 — AD PLACEMENTS
─────────────────────
Desktop (>1280px):
  - Left sidebar:  AdSense unit 160×600 (sticky)
  - Right sidebar: AdSense unit 160×600 (sticky)

Tablet (768–1280px):
  - After hero:       AdSense unit 728×90 (leaderboard)
  - Above footer:     AdSense unit 728×90

Mobile (<768px):
  - After hero:       AdSense unit 320×50
  - After subject row 2: AdSense unit 320×100
  - Above footer:     AdSense unit 320×50
  - Inside subject page between tabs and AI section: 320×100

Auto Ads: Also enable AdSense Auto Ads for extra placements.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 4 — BACKEND API SPECIFICATIONS (Render.com / FastAPI)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Base URL: https://tcet-api.onrender.com  (Render.com Web Service)
Auth:     All protected endpoints require Supabase JWT Access Token
          in Authorization header: "Bearer <access_token>"
Rate Limit: Manual rate limiting via Supabase user table fields

4.1 — FILE ENDPOINTS
──────────────────────
POST /api/files/signed-url
  Auth: Required (Supabase JWT)
  Body: { filePath: string, subjectId: string }
  Returns: { signedUrl: string, expiresAt: string }
  Logic: Verify Supabase JWT → check user exists in `users` table
         → generate Supabase Storage signed URL (expiry: 60 min)
         → log access event

POST /api/files/download-url
  Auth: Required
  Body: { filePath: string }
  Returns: { downloadUrl: string }
  Logic: Same as above but with download disposition

GET /api/subjects/:year/:semester
  Auth: Not required
  Returns: Full subject list with metadata (name, icon,
           isLocked, file counts per section)
  Logic: SELECT * FROM subjects WHERE year = :year AND semester = :semester

GET /api/subjects/:year/:semester/:subjectId/files
  Auth: Required
  Returns: { notes: [...], pdfs: [...], pyqs: [...],
             videos: [...] }
  Logic: Query `files` and `videos` tables filtered by subject/year/semester

4.2 — AI CHAT ENDPOINTS
─────────────────────────
POST /api/chat
  Auth: Required + subscription check
  Body: {
    message: string,
    subjectId: string,
    sessionId: string,
    history: [ { role: "user"|"bot", content: string } ]
  }
  Returns: { reply: string, sources: string[] }
  Logic:
    1. Verify Supabase JWT token
    2. Check users table: is_paid === true
    3. Check subscription not expired (subscription_expires_at > now)
    4. Rate limit: 20 AI messages/hour per user (tracked in users table)
    5. Fetch relevant note content from Supabase for context
    6. Send message + context + history to Gemini 2.0 Flash (free API)
    7. Return reply + sources
    8. Store conversation in chat_messages table

GET /api/chat/history/:sessionId
  Auth: Required (own sessions only)
  Returns: Full conversation history for that session

POST /api/chat/new-session
  Auth: Required
  Body: { subjectId: string }
  Returns: { sessionId: string }

4.3 — PAYMENT ENDPOINTS
─────────────────────────
POST /api/payment/create-order
  Auth: Required
  Body: { plan: "monthly" | "semester" }
  Returns: {
    orderId: string,       ← Razorpay order ID
    amount: number,        ← in paise (4900 or 9900)
    currency: "INR",
    keyId: string          ← public Razorpay key
  }

POST /api/payment/verify
  Auth: Required
  Body: {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    plan: "monthly" | "semester"
  }
  Logic:
    1. Verify HMAC signature using Razorpay secret
    2. If valid → update Supabase users table:
       is_paid = true
       plan = plan
       subscription_expires_at = now + 30 or 180 days
       razorpay_payment_id = payment_id
    3. Insert record into payments table
    4. Return: { success: true }
  On failure: Return 400 with error

POST /api/payment/webhook  ← Razorpay server-to-server
  Auth: Razorpay webhook signature (X-Razorpay-Signature)
  Handles: payment.captured, subscription.charged,
           payment.failed events
  On payment.captured: Same Supabase update as verify
  On payment.failed: Log error

4.4 — ADMIN ENDPOINTS
───────────────────────
All admin endpoints check:
  Supabase JWT → user.id === ADMIN_UID from env variable

POST /api/admin/upload
  Auth: Admin only
  Body: multipart/form-data {
    file: File,
    year: string,
    semester: string,
    subjectId: string,
    contentType: "notes"|"pdfs"|"pyqs"|"videos",
    title: string,
    examYear?: string  (for PYQs)
  }
  Logic:
    1. Validate file type (PDF, MP4, images only)
    2. Validate file size (max 50MB)
    3. Upload to Supabase Storage: tcet-notes/{year}/{semester}/{subjectId}/{type}/{filename}
    4. Insert record into files table
    5. Update subject stats (increment count)
    6. Return: { success: true, filePath: string }

POST /api/admin/upload-video-link
  Auth: Admin only
  Body: { year, semester, subjectId, title, youtubeUrl }
  Logic: Validate YouTube URL → insert into videos table → return success

DELETE /api/admin/file/:fileId
  Auth: Admin only
  Logic: Delete from Supabase Storage → delete from files table → return success

GET /api/admin/stats
  Auth: Admin only
  Returns: {
    totalUsers: number,
    activeToday: number,
    paidSubscribers: number,
    totalFiles: number,
    monthlyRevenue: number,
    topSubjects: [ { name, views } ]
  }
  Logic: SQL queries on users, files, payments tables

PATCH /api/admin/subject/:subjectId
  Auth: Admin only
  Body: { isLocked?: boolean, name?: string, icon?: string }
  Logic: UPDATE subjects table

4.5 — USER ENDPOINTS
──────────────────────
GET /api/user/profile
  Auth: Required
  Returns: Full user record from Supabase users table

PATCH /api/user/profile
  Auth: Required (own profile only)
  Body: { displayName?: string }
  Logic: UPDATE users table + update Supabase auth metadata

DELETE /api/user/account
  Auth: Required
  Logic: Delete from users table → delete Supabase auth user
         (using service role key) → return success

GET /api/user/subscription
  Auth: Required
  Returns: { isPaid, plan, expiresAt, daysRemaining }


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 5 — DATABASE DESIGN (Supabase PostgreSQL — Production Schema)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(Full SQL schema is in TECHSTACK.md — reference that for CREATE TABLE statements)

Table: users
──────────────
  id           UUID (primary key)
  auth_id      UUID (references auth.users)
  email        TEXT
  display_name TEXT
  photo_url    TEXT
  college      TEXT (default 'TCET')
  created_at   TIMESTAMPTZ
  last_active_at TIMESTAMPTZ
  is_paid      BOOLEAN
  plan         TEXT ('monthly' | 'semester')
  subscription_started_at  TIMESTAMPTZ
  subscription_expires_at  TIMESTAMPTZ
  razorpay_payment_id TEXT
  razorpay_order_id TEXT
  ai_messages_today INTEGER
  ai_last_reset_at TIMESTAMPTZ

Table: subjects
────────────────
  id           TEXT (primary key, e.g., 'chemistry')
  year         TEXT
  semester     TEXT
  name         TEXT
  full_name    TEXT
  icon         TEXT
  description  TEXT
  is_locked    BOOLEAN
  display_order INTEGER
  notes_count, pdfs_count, pyqs_count, videos_count INTEGER
  total_views  INTEGER

Table: files
─────────────
  id           UUID
  subject_id   TEXT (FK → subjects)
  year, semester TEXT
  content_type TEXT ('notes' | 'pdfs' | 'pyqs')
  title        TEXT
  storage_path TEXT  (path in Supabase Storage bucket)
  size_bytes   BIGINT
  mime_type    TEXT
  exam_year    TEXT  (for PYQs)
  downloads, views INTEGER

Table: videos
──────────────
  id           UUID
  subject_id   TEXT (FK → subjects)
  year, semester TEXT
  title, video_type TEXT ('youtube' | 'hosted')
  youtube_url  TEXT
  storage_path TEXT
  duration     TEXT
  views        INTEGER

Table: chat_sessions
─────────────────────
  id         UUID
  user_id    UUID (FK → users)
  subject_id TEXT
  year, semester TEXT

Table: chat_messages
─────────────────────
  id         UUID
  session_id UUID (FK → chat_sessions)
  role       TEXT ('user' | 'bot')
  content    TEXT
  sources    TEXT[]

Table: payments
────────────────
  id         UUID
  user_id    UUID (FK → users)
  email, plan TEXT
  amount     INTEGER (paise)
  razorpay_order_id, razorpay_payment_id TEXT
  status     TEXT ('created' | 'paid' | 'failed')

Row Level Security (RLS):
──────────────────────────
  ✓ users: can only read/write own row (auth.uid() = auth_id)
  ✓ subjects: readable by everyone (public API)
  ✓ files: readable by authenticated users
  ✓ videos: readable by authenticated users
  ✓ chat_sessions: own sessions only
  ✓ chat_messages: own session messages only
  ✓ payments: managed via backend service role (not client-accessible)

Auto User Creation (Supabase Trigger):
────────────────────────────────────────
  On new auth.users row (signup/OAuth) → automatically insert into
  public.users table with auth_id, email, display_name from metadata.

  ```sql
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.users (auth_id, email, display_name, photo_url)
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
      new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
  END;
  $$ language plpgsql security definer;

  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 6 — SUPABASE STORAGE ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bucket Name: tcet-notes
Access:      Private (no public URLs, all access via signed URLs)

Folder Structure:
─────────────────
tcet-notes/
  2025-26/
    sem1/
      chemistry/
        notes/     ← PDF/image files
        pdfs/
        pyqs/
        videos/    ← MP4 files (self-recorded only)
      physics/
      maths1/
      pps/
      egd/
      bee/
      egpc/
    sem2/
      maths2/
  thumbnails/        ← auto-generated video thumbnails
  og-images/         ← Open Graph images for SEO

Supabase Storage Policies:
───────────────────────────
  - Authenticated users can read files (download via signed URL only)
  - Only service role (backend) can upload/delete files
  - Signed URLs expire in 60 minutes
  - File path never exposed to frontend directly

  ```sql
  -- Storage RLS: authenticated users can read
  CREATE POLICY "Auth users can read" ON storage.objects
    FOR SELECT USING (bucket_id = 'tcet-notes' AND auth.role() = 'authenticated');
  
  -- Only backend (service role) can insert/delete
  -- Service role bypasses RLS, so no policy needed for uploads
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 7 — GEMINI AI — PRODUCTION SETUP (Free API)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Model         : Gemini 2.0 Flash (gemini-2.0-flash)
API           : Free tier from Google AI Studio (aistudio.google.com)
SDK           : google-generativeai (Python)

How It Works (replaces Vertex AI RAG):
───────────────────────────────────────
  1. User sends a question about a subject
  2. Backend queries Supabase for relevant note titles/content
  3. Backend constructs a prompt with subject context + question
  4. Sends to Gemini 2.0 Flash via free API
  5. Returns AI response to user

Query Config per chat request:
────────────────────────────────
{
  temperature: 0.2,             // low = factual answers
  max_output_tokens: 1024,
  system_instruction: "You are a study assistant for
    TCET first-year B.E. students. Answer ONLY using
    the provided context from {subjectName} notes.
    If the answer is not in the notes, say: 'This topic
    isn't in your uploaded notes yet. Check back after
    more notes are added.' Never make up information.
    Keep answers concise and student-friendly."
}

Rate Limiting (AI):
────────────────────
- Free users: 0 messages (paywall)
- Paid users: 20 messages/hour, 100 messages/day
- Enforced in backend via users table (ai_messages_today field)
- Reset at midnight IST (cron or on-request check)

Free API Limits (Gemini):
──────────────────────────
- 15 requests per minute (RPM)
- 1,000,000 tokens per day
- More than enough for a college project with ~100 active users


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 8 — PAYMENT FLOW (Razorpay — Production)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Plans:
  Monthly  : ₹49  (4900 paise)  → 30 days AI access
  Semester : ₹99  (9900 paise)  → 180 days AI access

Payment Flow Sequence:
───────────────────────
1. User clicks "Subscribe" on AI paywall widget
2. Frontend calls POST /api/payment/create-order (on Render.com)
3. Backend creates Razorpay order → returns orderId + amount
4. Frontend loads Razorpay checkout modal with:
   { key: RAZORPAY_KEY_ID, amount, currency, order_id,
     name: "TCET Notes Hub", description: "AI Study Assistant",
     prefill: { email: user.email, name: user.displayName } }
5. User completes UPI/card/netbanking payment
6. Razorpay returns { razorpay_payment_id, razorpay_order_id,
                      razorpay_signature }
7. Frontend calls POST /api/payment/verify with these values
8. Backend verifies HMAC signature → updates Supabase users table
9. Frontend Zustand store updates → AI chat unlocks instantly
10. Razorpay also sends server webhook (backup verification)

Refund Policy:
───────────────
- No refunds once AI access is activated
- Stated clearly on /refund-policy page
- Required by Razorpay and consumer protection law

Tax Handling:
──────────────
- GST not applicable (under ₹20L threshold at launch)
- Razorpay invoice generated automatically
- Track all payments in Supabase payments table
- Export monthly CSV from admin panel for ITR filing


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 9 — ADMIN PANEL (Full Specification)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Route: /admin (check Supabase user.id === ADMIN_UID in middleware.ts)

9.1 — Dashboard Tab
────────────────────
Stats cards (from /api/admin/stats on Render.com):
  • Total Registered Users
  • Active Users Today
  • Paid Subscribers
  • Total Files Uploaded
  • Estimated Monthly Revenue (subscribers × plan amount)
  • Top 3 Most Viewed Subjects

Recent Activity Feed:
  • Last 10 file uploads (who, what subject, when)
  • Last 10 new signups
  • Last 10 payments (plan, amount, user email)

9.2 — Upload Content Tab
─────────────────────────
Step 1: Dropdowns → Year / Semester / Subject / Content Type
Step 2: For Files (Notes, PDFs, PYQs):
  - Drag & drop zone (accepts PDF, PNG, JPG)
  - Max file size: 50MB per file
  - Multi-file upload: up to 10 files at once
  - Progress bar per file
  - After upload: backend uploads to Supabase Storage + inserts into files table
  - For PYQs: extra field for exam year (e.g. "2023–24")

Step 3: For Videos:
  Option A — YouTube Link:
    - Paste YouTube URL → auto-fetch title + thumbnail
    - Store URL in Supabase videos table (not re-hosted)
  Option B — Upload Video:
    - Upload MP4 to Supabase Storage
    - Max size: 500MB (check Supabase plan limits)
    - Auto-generate thumbnail via first frame

9.3 — Subject Management Tab
──────────────────────────────
Table of all 10 subjects showing:
  Name | Files Count | Status | Actions

Actions per subject:
  - Toggle Lock/Unlock (changes is_locked in subjects table)
  - Edit name/description/icon
  - View all files (list with delete option)
  - "Add New Subject" button at top

9.4 — Users Tab
─────────────────
Paginated table (50 per page):
  Email | Name | Joined | Last Active | Plan | Expires

Search by email or name
Filter by: All | Free | Paid | Expired

9.5 — Analytics Tab
─────────────────────
Charts (rendered with Chart.js):
  - Daily active users (last 30 days)
  - Subject views breakdown (bar chart)
  - Revenue last 6 months (line chart)
  - New signups per week

Export buttons:
  - "Export Users CSV"
  - "Export Payments CSV" (for ITR)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 10 — SECURITY (PRODUCTION REQUIREMENTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authentication:
  ✓ Supabase Auth (Google OAuth + Email/Password)
  ✓ JWT Access Token verified on every protected API call
  ✓ Token refresh handled by Supabase client automatically
  ✓ Sessions managed via Supabase (httpOnly cookies with @supabase/ssr)

File Security:
  ✓ Supabase Storage bucket is PRIVATE (zero public access)
  ✓ Signed URLs expire in 60 minutes
  ✓ Signed URL generated only after JWT verification
  ✓ File path never exposed to frontend directly
  ✓ Users cannot guess or enumerate file paths

API Security:
  ✓ CORS: only tcetnotes.in origin allowed on Render.com backend
  ✓ Rate limiting: tracked per user in Supabase users table
  ✓ Input validation on all endpoints (Pydantic)
  ✓ SQL injection prevented by Supabase client parameterized queries
  ✓ XSS: Next.js escapes all dynamic content
  ✓ CSRF: not needed (token-based auth, no cookies for API)
  ✓ Row Level Security (RLS) enforced at database level

Payment Security:
  ✓ HMAC signature verification on every payment
  ✓ Razorpay webhook signature verification
  ✓ Payment amounts validated server-side (not trusted from client)
  ✓ Duplicate payment prevention (idempotency key)

Admin Security:
  ✓ Admin UUID stored in Render.com env variable
  ✓ Checked in Next.js middleware (edge, before page load)
  ✓ Checked again in every admin API endpoint
  ✓ No admin panel linked from public navigation

Supabase RLS:
  ✓ All tables have Row Level Security enabled
  ✓ Users can only access their own data
  ✓ Service role key (used by backend) bypasses RLS for admin operations
  ✓ Anon key (used by frontend) respects all RLS policies


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 11 — DEVOPS & CI/CD PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repository: GitHub (monorepo)
  /frontend   → Next.js app (deploys to Vercel)
  /backend    → FastAPI app (deploys to Render.com)

Branch Strategy:
  main    → production deployment (auto-deploys on push)
  dev     → staging environment
  feature/* → feature branches (PR into dev)

Frontend Deployment (Vercel — automatic):
  1. Push to main → Vercel auto-builds and deploys
  2. Vercel runs: npm run build (Next.js build)
  3. Preview deployments on every PR
  4. Custom domain: tcetnotes.in → Vercel project settings

Backend Deployment (Render.com — automatic):
  1. Push to main → Render auto-builds and deploys
  2. Build command: pip install -r requirements.txt
  3. Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
  4. Custom domain: api.tcetnotes.in → Render service settings
  5. Auto-sleep after 15 min inactivity (free tier)

Environments:
  Production:  tcetnotes.in       → main branch
  Staging:     Preview URLs from Vercel PRs
  (Supabase: use same project or create separate staging project)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 12 — PERFORMANCE REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Web Vitals Targets:
  LCP  (Largest Contentful Paint)  < 2.5s
  FID  (First Input Delay)         < 100ms
  CLS  (Cumulative Layout Shift)   < 0.1
  TTFB (Time to First Byte)        < 200ms

Achieved via:
  ✓ Next.js SSG/ISR for homepage and subject pages
  ✓ Vercel global CDN (edge caching)
  ✓ next/image for all images (WebP, lazy loading)
  ✓ next/font for Inter (self-hosted, no FOUT)
  ✓ PDF.js loaded lazily (code split — only on subject page)
  ✓ Framer Motion tree-shaken to only used animations
  ✓ Zustand lightweight (<1KB) vs Redux

PDF Load Target: < 3 seconds for a 5MB PDF
AI Response Target: < 5 seconds per Gemini query
Signed URL Generation: < 500ms

Note on Render.com cold starts:
  First request after 15 min inactivity: ~30–50 seconds
  Subsequent requests: < 300ms
  Mitigation: Use a free cron service (e.g., cron-job.org) to ping
  /health every 14 minutes to keep the service warm.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 13 — MONITORING & ALERTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vercel Analytics (Frontend):
  - Page views (all pages)
  - Core Web Vitals tracking
  - Geographic distribution

Render.com Logs (Backend):
  - All API requests logged with: userId, endpoint,
    responseTime, statusCode
  - File access events: who accessed what, when
  - Payment events: order created, verified, failed

Supabase Dashboard:
  - Active connections
  - Database size + row counts
  - Storage usage
  - Auth user metrics

Error Tracking:
  - Sentry (free tier) integrated in Next.js frontend
  - All unhandled exceptions reported with stack trace
  - Source maps uploaded for readable error reports

Uptime Monitoring:
  - Use free UptimeRobot to monitor:
    - https://tcetnotes.in (frontend)
    - https://tcet-api.onrender.com/health (backend)
  - Email alerts on downtime


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 14 — FULL PROJECT FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tcet-notes-hub/  (GitHub monorepo root)
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx            ← Root layout (Navbar + AdSidebars + Footer)
│   │   ├── page.tsx              ← Homepage
│   │   ├── [year]/
│   │   │   └── [semester]/
│   │   │       ├── page.tsx      ← Subject grid
│   │   │       └── [subject]/
│   │   │           ├── page.tsx  ← Subject page (4 tabs)
│   │   │           └── chat/
│   │   │               └── page.tsx  ← AI chat (paid)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/page.tsx ← Supabase OAuth callback
│   │   ├── profile/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx          ← Dashboard
│   │   │   ├── upload/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── analytics/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── refund-policy/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── AdSidebar.tsx
│   │   │   └── MobileDrawer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── YearSelector.tsx
│   │   │   ├── SemesterTabs.tsx
│   │   │   ├── SubjectGrid.tsx
│   │   │   ├── SubjectCard.tsx
│   │   │   ├── AIPromoSection.tsx
│   │   │   └── HowItWorks.tsx
│   │   ├── subject/
│   │   │   ├── SubjectHeader.tsx
│   │   │   ├── ContentTabs.tsx
│   │   │   ├── FileList.tsx
│   │   │   ├── FileItem.tsx
│   │   │   ├── PDFViewer.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── PYQList.tsx
│   │   ├── auth/
│   │   │   ├── LoginWall.tsx
│   │   │   └── AuthForm.tsx
│   │   ├── ai/
│   │   │   ├── AIChatWidget.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── AIPaywall.tsx
│   │   ├── payment/
│   │   │   └── RazorpayButton.tsx
│   │   ├── admin/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── UploadForm.tsx
│   │   │   ├── SubjectManager.tsx
│   │   │   └── UsersTable.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       ├── Skeleton.tsx
│   │       └── Spinner.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts           ← Supabase browser client
│   │   ├── supabase-server.ts    ← Supabase server client (SSR)
│   │   ├── api.ts                ← Fetch wrappers for Render.com API
│   │   └── razorpay.ts           ← Razorpay checkout loader
│   │
│   ├── store/
│   │   └── authStore.ts          ← Zustand store
│   │
│   ├── types/
│   │   ├── subject.ts
│   │   ├── user.ts
│   │   └── payment.ts
│   │
│   ├── middleware.ts              ← Auth + Admin route protection (reads Supabase session)
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/
│   ├── main.py                   ← FastAPI app entry
│   ├── routes/
│   │   ├── files.py              ← /api/files/* (Supabase Storage signed URLs)
│   │   ├── chat.py               ← /api/chat/* (Gemini AI free API)
│   │   ├── payment.py            ← /api/payment/* (Razorpay)
│   │   ├── admin.py              ← /api/admin/*
│   │   ├── user.py               ← /api/user/*
│   │   └── subjects.py           ← /api/subjects/*
│   ├── services/
│   │   ├── supabase_client.py    ← Supabase Python client init
│   │   ├── gemini.py             ← Gemini AI free API
│   │   └── razorpay_client.py    ← Payment operations
│   ├── core/
│   │   ├── auth.py               ← Supabase JWT verification middleware
│   │   └── config.py             ← Pydantic settings
│   ├── requirements.txt
│   └── render.yaml               ← Render.com deployment config
│
└── README.md


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 15 — DEPLOYMENT CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Supabase Setup:
  [ ] Create Supabase project (free at supabase.com)
  [ ] Run SQL schema (from TECHSTACK.md) in SQL Editor
  [ ] Enable Email/Password auth in Auth → Providers
  [ ] Enable Google OAuth in Auth → Providers → Google
      (requires Google Cloud console OAuth client ID)
  [ ] Create Storage bucket "tcet-notes" (private)
  [ ] Set up Storage RLS policies
  [ ] Create database trigger for auto user creation
  [ ] Copy: Project URL, anon key, service role key, JWT secret

Vercel Setup (Frontend):
  [ ] Create Vercel account (free)
  [ ] Import GitHub repo → select /frontend folder
  [ ] Add environment variables:
      NEXT_PUBLIC_SUPABASE_URL
      NEXT_PUBLIC_SUPABASE_ANON_KEY
      NEXT_PUBLIC_API_URL
  [ ] Deploy (auto on push to main)

Render.com Setup (Backend):
  [ ] Create Render account (free)
  [ ] Create new Web Service → connect GitHub repo
  [ ] Set root directory: /backend
  [ ] Build command: pip install -r requirements.txt
  [ ] Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
  [ ] Add environment variables:
      SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWT_SECRET
      RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
      ADMIN_UID, GEMINI_API_KEY
  [ ] Deploy

Gemini AI Setup:
  [ ] Go to aistudio.google.com
  [ ] Create API key (free)
  [ ] Add GEMINI_API_KEY to Render.com env vars

Domain Setup:
  [ ] Buy domain: tcetnotes.in (₹700–1200/year on GoDaddy)
  [ ] Connect to Vercel (custom domain in project settings)
  [ ] HTTPS auto-provisioned by Vercel
  [ ] (Optional) Connect api.tcetnotes.in to Render.com service

Razorpay Setup:
  [ ] Create Razorpay account
  [ ] Complete KYC (business or individual)
  [ ] Get API keys (test + live)
  [ ] Set webhook URL: https://tcet-api.onrender.com/api/payment/webhook
  [ ] Add Refund Policy URL on Razorpay dashboard

AdSense Setup:
  [ ] Create AdSense account (use parent's PAN if under 18)
  [ ] Add site: tcetnotes.in
  [ ] Add Privacy Policy, About, Contact pages first
  [ ] Wait for approval (2–4 weeks typically)
  [ ] Add ad unit IDs to frontend after approval

Keep Backend Warm (Optional):
  [ ] Go to cron-job.org (free)
  [ ] Create job: GET https://tcet-api.onrender.com/health
  [ ] Frequency: every 14 minutes
  [ ] This prevents cold starts on Render.com free tier

Go-Live:
  [ ] Upload at least 3 files per subject before launch
  [ ] Test complete payment flow end-to-end
  [ ] Test PDF viewer on mobile + desktop
  [ ] Test AI chat with real Gemini responses
  [ ] Set up UptimeRobot monitoring
  [ ] Share in TCET WhatsApp groups!

════════════════════════════════════════════════════════════════════
END OF PRD — TCET NOTES HUB v3.0 FULLSTACK (FREE TIER)
════════════════════════════════════════════════════════════════════
