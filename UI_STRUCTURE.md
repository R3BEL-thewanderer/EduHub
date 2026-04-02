# 🗂️ UI_STRUCTURE.md — TCET Notes Hub
# Website Data, Structure & Flow Reference
# (Template-agnostic — apply your own design template on top)
# ─────────────────────────────────────────────────────────────

## ═══════════════════════════════════════
## SECTION 1 — SITE MAP (All Pages)
## ═══════════════════════════════════════

/                              → Homepage
/auth/login                    → Login Page
/auth/signup                   → Signup Page
/[year]/[semester]/            → Semester Subject Grid
/[year]/[semester]/[subject]/  → Subject Content Page (4 tabs)
/admin                         → Admin Upload Panel (protected)
/privacy-policy                → Privacy Policy (required for AdSense)
/terms                         → Terms of Service (required for payments)
/about                         → About Page (required for AdSense)
/contact                       → Contact Page (required for AdSense)
/404                           → Not Found Page


## ═══════════════════════════════════════
## SECTION 2 — GLOBAL LAYOUT STRUCTURE
## ═══════════════════════════════════════

Every page shares this wrapper layout:

┌──────────────────────────────────────────────────────┐
│                     NAVBAR (sticky)                  │
├──────────┬───────────────────────────┬───────────────┤
│          │                           │               │
│ LEFT AD  │     PAGE CONTENT AREA     │  RIGHT AD     │
│ (sticky) │     (max-width: 860px)    │  (sticky)     │
│          │     (centered, padded)    │               │
│          │                           │               │
├──────────┴───────────────────────────┴───────────────┤
│                      FOOTER                          │
└──────────────────────────────────────────────────────┘

AD SIDEBAR RULES:
- Both sidebars appear only on screens wider than 1280px
- On tablet (768–1280px): No sidebars. One inline ad after hero + one above footer
- On mobile (< 768px): No sidebars. Inline banner ads between content sections
- Ad units from Google AdSense (160×600 desktop | 320×50 mobile)
- Sidebars scroll with page but stop at footer (position: sticky, top: 80px)


## ═══════════════════════════════════════
## SECTION 3 — NAVBAR DATA & STRUCTURE
## ═══════════════════════════════════════

LEFT SIDE:
  Logo text: "TCET Notes Hub"
  Logo icon: graduation cap icon

CENTER LINKS (desktop only):
  - "Home"              → links to /
  - "Subjects"          → dropdown (see below)
  - "Academic Year"     → dropdown (see below)

RIGHT SIDE:
  - If NOT logged in: "Login" button  → /auth/login
  - If logged in:     User avatar (circle, initials) → dropdown:
      • "My Profile"
      • "Logout"

SUBJECTS DROPDOWN content:
  Group label: "Semester 1 — 2025-26"
    1. Chemistry         → /2025-26/sem1/chemistry
    2. Physics           → /2025-26/sem1/physics
    3. Maths 1           → /2025-26/sem1/maths1
    4. PPS (C Program.)  → /2025-26/sem1/pps
    5. EGD               → /2025-26/sem1/egd
    6. BEE               → /2025-26/sem1/bee
    7. EGPC              → /2025-26/sem1/egpc
    8. Coming Soon       → disabled, not clickable
    9. Coming Soon       → disabled, not clickable
   10. Coming Soon       → disabled, not clickable

  Group label: "Semester 2 — 2025-26"
    1. Maths 2           → /2025-26/sem2/maths2
    (more subjects added later)

ACADEMIC YEAR DROPDOWN content:
  - "2025–26"  → /2025-26/sem1  (active, clickable)
  - "2026–27"  → disabled, label: "Uploading Soon"
  - "2027–28"  → disabled, label: "Coming Later"

MOBILE NAVBAR:
  - Shows logo left + hamburger menu icon right
  - Hamburger opens a full-height slide-in drawer from right
  - Drawer contains all nav links stacked vertically
  - Login button at bottom of drawer


## ═══════════════════════════════════════
## SECTION 4 — HOMEPAGE DATA & STRUCTURE
## ═══════════════════════════════════════

── HERO SECTION ──────────────────────────────────────

  Eyebrow text (small, above heading):
    "Free Study Resources for TCET First Year B.E. Students"

  Main heading:
    "Everything You Need to"
    "Crack First Year B.E." ← this line has animated typewriter cycling:
    words cycle: "Crack First Year B.E." | "Ace Your Exams" | "Study Smarter"

  Subheading:
    "Notes, PDFs, PYQs and Video Lectures — all organised by subject.
     Login once and access everything for free."

  CTA Buttons (2):
    Primary:   "Start Learning →"  → scrolls to subject grid section
    Secondary: "Browse Subjects"   → /2025-26/sem1

  Stats row (3 items):
    • "500+ Resources"
    • "7 Subjects"
    • "Free Access"

── YEAR SELECTOR SECTION ──────────────────────────────

  Section label: "Select Academic Year"

  Cards (horizontal scroll on mobile):
    Card 1: "2025 – 26"  subtitle: "First Year B.E."   status: Active → clickable
    Card 2: "2026 – 27"  subtitle: "Coming Next Year"  status: Locked → not clickable
    Card 3: "2027 – 28"  subtitle: "Coming Later"      status: Locked → not clickable

  Active card is visually distinguished (you decide style from template)
  Locked cards show a lock icon overlay

── SEMESTER TABS SECTION ──────────────────────────────

  Tab 1: "Semester 1"  (default active)
  Tab 2: "Semester 2"

  Only one tab active at a time
  Switching tabs changes the subject grid below

── SUBJECT GRID SECTION ───────────────────────────────

  Section heading: "Subjects"  subtitle: "2025–26 · Semester 1" (updates with tab)

  Grid layout: 3 columns desktop / 2 columns tablet / 1 column mobile

  SUBJECT CARD DATA (each card shows):
    - Subject icon (emoji or SVG)
    - Subject full name
    - Subject short description (1 line)
    - 4 mini-badge labels: "Notes", "PDFs", "PYQ", "Videos"
    - CTA: "Open Subject →"
    - If locked: Shows lock icon + "Coming Soon" instead of CTA

  SEMESTER 1 SUBJECT CARDS:

  Card 1:
    icon: 🧪
    name: "Chemistry"
    desc: "Engineering Chemistry — Units 1 to 5"
    route: /2025-26/sem1/chemistry
    status: active

  Card 2:
    icon: ⚡
    name: "Physics"
    desc: "Applied Physics — Waves, Optics, Quantum"
    route: /2025-26/sem1/physics
    status: active

  Card 3:
    icon: 📐
    name: "Maths 1"
    desc: "Engineering Mathematics 1 — Calculus & Algebra"
    route: /2025-26/sem1/maths1
    status: active

  Card 4:
    icon: 💻
    name: "PPS"
    desc: "Programming & Problem Solving — C Language"
    route: /2025-26/sem1/pps
    status: active

  Card 5:
    icon: 📏
    name: "EGD"
    desc: "Engineering Graphics & Drawing"
    route: /2025-26/sem1/egd
    status: active

  Card 6:
    icon: 🔋
    name: "BEE"
    desc: "Basic Electrical Engineering"
    route: /2025-26/sem1/bee
    status: active

  Card 7:
    icon: 🖥️
    name: "EGPC"
    desc: "Engineering Graphics & Product Creation"
    route: /2025-26/sem1/egpc
    status: active

  Card 8:
    icon: 🔒
    name: "Coming Soon"
    desc: "New subject will be added here"
    route: none
    status: locked

  Card 9:
    icon: 🔒
    name: "Coming Soon"
    desc: "New subject will be added here"
    route: none
    status: locked

  Card 10:
    icon: 🔒
    name: "Coming Soon"
    desc: "New subject will be added here"
    route: none
    status: locked

  SEMESTER 2 SUBJECT CARDS (shown when Sem 2 tab active):

  Card 1:
    icon: 📐
    name: "Maths 2"
    desc: "Engineering Mathematics 2 — Differential Equations"
    route: /2025-26/sem2/maths2
    status: active

  Cards 2–10: All "Coming Soon" (locked)

── AI FEATURE PROMO SECTION ──────────────────────────

  Heading: "Meet Your AI Study Assistant"
  Subheading: "Ask questions. Get answers from your own TCET notes.
               Powered by Google Gemini."

  3 Feature Bullets:
    • "Answers from your subject notes — not random internet results"
    • "Available for every subject — Chemistry, Physics, Maths and more"
    • "₹49/month — less than a cup of chai ☕"

  CTA button: "Try AI Assistant →" → scrolls to subject, then to chat section

── HOW IT WORKS SECTION ──────────────────────────────

  Section heading: "How It Works"

  Step 1:  icon: 🔍  title: "Browse"       desc: "Pick your year, semester and subject"
  Step 2:  icon: 👤  title: "Login Free"   desc: "Create a free account with your email"
  Step 3:  icon: 📖  title: "Study"        desc: "Access notes, PDFs, PYQs and videos"
  Step 4:  icon: 🤖  title: "Ask AI"       desc: "Unlock Gemini AI for ₹49/month"

── FOOTER ────────────────────────────────────────────

  Left:   Logo + tagline: "Study Smarter. Score Higher."
          Copyright: "© 2026 TCET Notes Hub. All rights reserved."

  Center col heading: "Quick Links"
  Links: Home | Subjects | About | Contact

  Right col heading: "Legal"
  Links: Privacy Policy | Terms of Service | Refund Policy

  Bottom strip: "Made with ❤️ for TCET First Year Students"


## ═══════════════════════════════════════
## SECTION 5 — AUTH PAGES
## ═══════════════════════════════════════

── LOGIN PAGE (/auth/login) ──────────────────────────

  Page heading: "Welcome Back"
  Subheading:   "Login to access your study material"

  Form fields:
    1. Email input     — placeholder: "you@example.com"  type: email
    2. Password input  — placeholder: "Your password"    type: password
       Below password: "Forgot Password?" link → triggers email reset

  Submit button text: "Login"

  Divider text: "or"

  Google button text: "Continue with Google"

  Footer text: "Don't have an account?"  link: "Sign Up" → /auth/signup

  On success: Redirect to the page user was on before login wall triggered
  On error:   Show inline error: "Invalid email or password. Try again."

── SIGNUP PAGE (/auth/signup) ────────────────────────

  Page heading: "Create Free Account"
  Subheading:   "Join thousands of TCET students"

  Form fields:
    1. Full Name    — placeholder: "Your full name"
    2. Email        — placeholder: "you@example.com"
    3. Password     — placeholder: "Min 8 characters"
    4. Confirm Pwd  — placeholder: "Re-enter password"

  Submit button text: "Create Account"

  Divider text: "or"

  Google button text: "Sign up with Google"

  Footer text: "Already have an account?" link: "Login" → /auth/login

  Below form (small text):
    "By signing up you agree to our Terms of Service and Privacy Policy"

  On success: Auto login → redirect to homepage


## ═══════════════════════════════════════
## SECTION 6 — SUBJECT PAGE DATA & FLOW
## ═══════════════════════════════════════

ROUTE: /[year]/[semester]/[subject]
EXAMPLE: /2025-26/sem1/chemistry

── BREADCRUMB (top of page) ──────────────────────────

  Home  /  2025–26  /  Semester 1  /  Chemistry

── SUBJECT HEADER ────────────────────────────────────

  Icon:         🧪  (large, 48px)
  Name:         "Chemistry"
  Full name:    "Engineering Chemistry"
  Description:  "Semester 1 · Academic Year 2025–26 · B.E. First Year"
  Badge row:    "📄 Notes" | "📋 PDFs" | "📝 PYQ" | "🎬 Videos"

── CONTENT TABS ──────────────────────────────────────

  Tab 1: "📓 Notes"
  Tab 2: "📄 PDFs"
  Tab 3: "📝 PYQ"
  Tab 4: "🎬 Videos"

  Default active tab: Tab 1 (Notes)
  Clicking a tab switches content panel below instantly

── LOGIN WALL (shown if user NOT logged in, on tab click) ──

  Icon: 🔒
  Heading:    "Login to Access This Content"
  Subtext:    "Create a free account to view notes, PDFs, PYQs and videos"
  Button 1:   "Login with Google"
  Button 2:   "Login with Email"
  Footer:     "It's completely free and takes less than 30 seconds"

── TAB 1 — NOTES CONTENT PANEL ──────────────────────

  Panel heading: "Notes"  subtext: "Handwritten & typed notes by subject"

  Each file item shows:
    - File icon (📄 for PDF, 🖼️ for image)
    - File name  (e.g., "Unit 1 — Atomic Structure")
    - File size  (e.g., "2.3 MB")
    - Upload date (e.g., "Uploaded 12 Mar 2026")
    - Two action buttons:
        "👁️ View"      → opens inline PDF viewer below the list
        "📥 Download"  → triggers file download

  Inline PDF Viewer (opens below file list when View clicked):
    - Shows: "Viewing: Unit 1 — Atomic Structure"
    - Close button: "✕ Close Viewer"
    - Navigation: "◀ Previous Page"  "Page X of Y"  "Next Page ▶"
    - Full PDF renders here — NEVER opens a new tab or new page
    - Ads remain fully visible on both sides during PDF viewing

  Empty state (no files yet):
    Icon: 📭
    Text: "No notes uploaded yet — check back soon!"

── TAB 2 — PDFs CONTENT PANEL ──────────────────────

  Panel heading: "PDFs"  subtext: "Reference material and study guides"

  Same file item structure as Notes tab
  Same inline PDF viewer behavior
  Empty state same text style

── TAB 3 — PYQ CONTENT PANEL ──────────────────────

  Panel heading: "Previous Year Questions"
  Subtext: "Past exam papers to help you prepare"

  Each file item shows:
    - File icon
    - File name (e.g., "Chemistry PYQ — 2023–24")
    - Exam year tag (e.g., "2023–24", "2022–23")
    - File size
    - "👁️ View" and "📥 Download" buttons (same as Notes)

  Empty state:
    Text: "PYQ papers will be added before exams — stay tuned!"

── TAB 4 — VIDEOS CONTENT PANEL ──────────────────────

  Panel heading: "Video Lectures"
  Subtext: "Recorded lectures and concept explainers"

  Each video item shows:
    - Thumbnail (auto-generated or custom)
    - Video title (e.g., "Unit 1 — Atomic Structure Explained")
    - Duration (e.g., "24:15")
    - Type badge: "Hosted" (on Cloud Storage) OR "YouTube" (embedded)
    - "▶ Watch" button

  On clicking Watch:
    - Video player expands inline below the list (never opens new tab)
    - If YouTube: renders as YouTube iframe embed
    - If hosted: renders as HTML5 <video> player
    - Ads remain visible during video playback

  Empty state:
    Text: "Video lectures coming soon for this subject!"

── AI CHAT SECTION (below all tabs) ──────────────────

  Section heading: "🤖 AI Study Assistant"
  Powered by label: "Powered by Google Gemini 2.0"
  Context label: "Trained on your TCET Chemistry notes"

  STATE A — User NOT subscribed:
    Overlay/lock card shows:
      Heading: "Unlock AI-Powered Doubt Solving"
      Features:
        ✓ Asks questions from Chemistry notes
        ✓ Instant answers — no waiting
        ✓ Works for all subjects
      Price: "₹49 / month"  OR  "₹99 / 6 months  (save 33%)"
      CTA button: "Subscribe Now →" → opens Razorpay payment modal
      Fine print: "Cancel anytime. Secure payment via Razorpay."

  STATE B — User IS subscribed:
    Chat interface shows:
      Header: "Chemistry AI  ●  Online"
      Chat history (scrollable):
        Bot first message: "Hi [Name]! I'm ready to help with Chemistry.
                            Ask me anything from your Semester 1 notes. 🧪"
      Input bar:
        Placeholder: "Ask a question from Chemistry notes..."
        Send button: "Send"
      Note below input: "Answers are based on uploaded TCET notes only"

  STATE C — Loading/Typing:
    Bot shows animated "..." typing indicator while fetching answer


## ═══════════════════════════════════════
## SECTION 7 — COMPLETE USER FLOW DIAGRAMS
## ═══════════════════════════════════════

── FLOW 1: Guest Browses to Subject Content ──────────

  START → Homepage
    ↓ Selects Academic Year (2025–26)
    ↓ Selects Semester (Sem 1)
    ↓ Sees subject grid
    ↓ Clicks a subject card (e.g., Chemistry)
    ↓ Subject page loads (header + tabs visible)
    ↓ Clicks any tab (Notes / PDFs / PYQ / Videos)
    ↓ LOGIN WALL appears
    ↓ User clicks "Login with Google" or "Login with Email"
    → Redirected to /auth/login (or Supabase Google OAuth flow)
    → On success → redirected via /auth/callback BACK to subject page, same tab
    → Content now visible ✓

── FLOW 2: Returning Logged-In User ──────────────────

  START → Homepage (already logged in via Supabase session)
    ↓ Navbar shows user avatar
    ↓ Clicks "Subjects" dropdown → selects subject directly
    ↓ Subject page loads
    ↓ Content immediately accessible (no login wall)
    ↓ Views PDF inline → ads stay visible ✓

── FLOW 3: User Subscribes for AI ───────────────────

  START → Subject page (logged in, not subscribed)
    ↓ Scrolls to AI section at bottom
    ↓ Sees locked AI widget with pricing
    ↓ Clicks "Subscribe Now →"
    ↓ Razorpay modal opens (₹49 or ₹99 plan)
    ↓ User completes payment
    ↓ Razorpay sends webhook → Render.com backend verifies
    ↓ Supabase users table updates: is_paid = true
    ↓ Page auto-refreshes AI section → chat unlocked ✓
    ↓ User can now chat on ALL subjects ✓

── FLOW 4: Admin Uploads Content ─────────────────────

  START → /admin (your Supabase user UUID only — others see 403)
    ↓ Select: Year → Semester → Subject → Content Type
    ↓ Upload file (drag & drop or file picker)
    ↓ File uploads to Supabase Storage bucket
    ↓ Backend inserts record into files table with storage path + metadata
    ↓ Content appears live on subject page immediately ✓

── FLOW 5: PDF Viewing (Key AdSense Flow) ────────────

  User clicks "👁️ View" on any PDF
    ↓ Frontend requests signed URL from Render.com backend API
    ↓ Backend verifies Supabase JWT auth token
    ↓ Backend generates 60-min signed URL from Supabase Storage
    ↓ react-pdf renders PDF inside website layout
    ↓ Left + right ads remain visible throughout ✓
    ↓ User cannot share the URL (expires in 60 min)
    ↓ User cannot open in new tab (no direct link exposed) ✓


## ═══════════════════════════════════════
## SECTION 8 — ALL TEXT CONTENT & LABELS
## ═══════════════════════════════════════

SITE-WIDE LABELS:
  - "Coming Soon"           → locked subjects / years
  - "Free"                  → badge on all free content
  - "Premium"  OR  "⭐ AI"  → badge on AI chat feature
  - "New"                   → badge on freshly uploaded subjects
  - "Updated"               → badge when new files added to existing subject

BUTTON LABELS (consistent across site):
  Primary actions:    "Start Learning →"  |  "Open Subject →"  |  "Subscribe Now →"
  Auth actions:       "Login"  |  "Sign Up"  |  "Continue with Google"  |  "Logout"
  File actions:       "👁️ View"  |  "📥 Download"  |  "▶ Watch"
  Navigation:         "← Back"  |  "Next Page ▶"  |  "◀ Previous Page"
  AI chat:            "Send"  |  "Ask AI"  |  "Unlock AI"

ERROR MESSAGES:
  Auth error:         "Invalid email or password. Please try again."
  File load error:    "Failed to load file. Please refresh and try again."
  Payment error:      "Payment failed. No amount was charged. Try again."
  AI error:           "AI is taking too long to respond. Try again in a moment."
  Network error:      "No internet connection. Please check your network."

SUCCESS MESSAGES:
  Signup success:     "Account created! Welcome to TCET Notes Hub 🎉"
  Login success:      "Welcome back, [Name]! 👋"
  Payment success:    "AI Assistant unlocked! Start asking questions 🤖"
  Upload success:     "File uploaded successfully ✓"


## ═══════════════════════════════════════
## SECTION 9 — ADMIN PANEL STRUCTURE
## ═══════════════════════════════════════

ROUTE: /admin  (protected — only your Supabase user UUID can access)

Layout:
  Left sidebar:  Navigation menu
  Main area:     Content panel

Sidebar nav items:
  📊 Dashboard       → stats: total users, active today, paid subscribers
  📁 Upload Content  → file upload panel
  👥 Users           → list of registered users
  💳 Subscriptions   → list of paid users + expiry dates
  🔒 Subjects        → toggle which subjects are locked/unlocked

Upload Content Panel:
  Step 1: Select Year       (dropdown: 2025-26)
  Step 2: Select Semester   (dropdown: Sem 1 | Sem 2)
  Step 3: Select Subject    (dropdown: all 10 subjects)
  Step 4: Select Type       (tabs: Notes | PDFs | PYQ | Videos)
  Step 5: For Files:        Drag & drop zone  OR  "Browse Files" button
          For Videos:       Two options:
                            A. "Paste YouTube URL" input field
                            B. "Upload Video File" → goes to Cloud Storage
  Step 6: Add title         (text input — shown to students)
  Step 7: Click "Upload"    → progress bar → success message

Dashboard Stats cards:
  Card 1: "Total Registered Users"  → number
  Card 2: "Active Today"            → number
  Card 3: "Paid Subscribers"        → number
  Card 4: "Files Uploaded"          → total count


## ═══════════════════════════════════════
## SECTION 10 — REQUIRED LEGAL PAGES
## ═══════════════════════════════════════

These 4 pages are MANDATORY for AdSense approval:

/about
  Content: Who runs the site, purpose (TCET study resource),
           contact email, college name

/contact
  Content: Contact form (Name + Email + Message) OR just email address
           Response time notice: "We reply within 48 hours"

/privacy-policy
  Content must mention:
  - What data is collected (email, name)
  - Why it's collected (auth, subscriptions)
  - Google AdSense uses cookies (legally required)
  - Google Analytics data collection
  - User can request data deletion via email

/terms
  Content must mention:
  - Acceptable use (students only, no reselling content)
  - Subscription terms (₹49/month, cancel policy)
  - No guarantee of exam results
  - Admin can remove content at any time


## ═══════════════════════════════════════
## SECTION 11 — SUPABASE DATA READING LOGIC
## ═══════════════════════════════════════

Homepage subject grid:
  QUERY: SELECT * FROM subjects WHERE year = '2025-26' AND semester = 'sem1' ORDER BY display_order
  DISPLAY: all subject rows → one card per subject
  CHECK: if subject.is_locked === true → show "Coming Soon" card

Subject page tabs:
  QUERY: SELECT * FROM files WHERE subject_id = '[subject]' AND year = '2025-26' AND semester = 'sem1' AND content_type = 'notes'
  QUERY: SELECT * FROM files WHERE subject_id = '[subject]' AND year = '2025-26' AND semester = 'sem1' AND content_type = 'pdfs'
  QUERY: SELECT * FROM files WHERE subject_id = '[subject]' AND year = '2025-26' AND semester = 'sem1' AND content_type = 'pyqs'
  QUERY: SELECT * FROM videos WHERE subject_id = '[subject]' AND year = '2025-26' AND semester = 'sem1'

User login state:
  READ: Supabase Auth session via supabase.auth.getSession()
  LISTEN: supabase.auth.onAuthStateChange() for real-time updates
  IF session === null → show login wall on content access

User subscription:
  QUERY: SELECT is_paid, plan, subscription_expires_at FROM users WHERE auth_id = [user.id]
  CHECK: is_paid === true AND subscription_expires_at > now() → unlock AI chat
  ELSE → show AI locked widget with pricing

Admin check:
  READ: Supabase Auth session → user.id
  COMPARE to ADMIN_UID env variable (NEXT_PUBLIC_ not needed, checked in middleware)
  IF match → show admin panel, ELSE → redirect to homepage
