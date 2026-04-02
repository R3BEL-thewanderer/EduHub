# 🎨 UI_DESIGN.md — TCET Notes Hub
**Design Philosophy:** Dark-first, Clean, Premium Study Platform  
**Feel:** Like a modern developer tool meets a study resource — NOT a generic AI purple app  

---

## 1. Color Palette

```
Primary Background:   #0a0e1a   (Deep Midnight Blue — almost black)
Card Background:      #111827   (Dark Navy Card)
Card Hover:           #1a2235   (Slightly lighter navy)
Border Color:         #1e293b   (Subtle dark border)

Primary Accent:       #00c9a7   (Vibrant Mint/Teal — CTA buttons, active states)
Secondary Accent:     #ff6b35   (Electric Orange — highlights, badges, tags)
Tertiary Accent:      #ffd60a   (Golden Yellow — premium/paid features)

Text Primary:         #f1f5f9   (Near White)
Text Secondary:       #94a3b8   (Muted Blue-Grey)
Text Muted:           #475569   (Dimmed — placeholders, timestamps)

Success:              #22c55e   (Green — upload complete, verified)
Warning:              #f59e0b   (Amber — coming soon, notice)
Error:                #ef4444   (Red — errors)

Gradient (Hero):      linear-gradient(135deg, #0a0e1a 0%, #0d1b2a 50%, #001a12 100%)
Gradient (CTA):       linear-gradient(90deg, #00c9a7, #0ea5e9)
Gradient (Premium):   linear-gradient(90deg, #ffd60a, #ff6b35)
```

**Why this palette?**
- Deep midnight background = easy on eyes during late-night studying
- Mint/Teal = fresh, trustworthy, unique (not purple, not generic blue)
- Orange = energy, urgency for CTAs and badges
- Gold = premium feel for paid AI feature — students know it's special

---

## 2. Typography

```
Font Stack:
  Headings:  'Inter' (Google Fonts) — weight 700, 800
  Body:      'Inter' — weight 400, 500
  Code/PYQ:  'JetBrains Mono' (Google Fonts) — for any code content (PPS subject)
  Fallback:  -apple-system, BlinkMacSystemFont, sans-serif

Font Sizes (Tailwind scale):
  Hero Title:       text-5xl (48px) — bold
  Section Heading:  text-3xl (30px) — semibold
  Card Title:       text-xl  (20px) — semibold
  Body:             text-base (16px) — regular
  Caption/Meta:     text-sm  (14px) — muted color
  Badge/Tag:        text-xs  (12px) — uppercase, tracked
```

---

## 3. Page Layouts

### 3.1 Global Layout (All Pages)

```
┌─────────────────────────────────────────────────────────────────┐
│                        STICKY NAVBAR                            │
├──────────┬──────────────────────────────────────┬───────────────┤
│          │                                      │               │
│  AD BOX  │         MAIN CONTENT AREA            │    AD BOX     │
│ 160×600  │         (max-width: 860px)           │   160×600     │
│ (Left)   │                                      │   (Right)     │
│  sticky  │                                      │    sticky     │
│          │                                      │               │
└──────────┴──────────────────────────────────────┴───────────────┘
│                         FOOTER                                  │
└─────────────────────────────────────────────────────────────────┘

NOTE: Ad sidebars are sticky (position: sticky, top: 80px)
On mobile (< 1024px): Ads collapse and appear between content sections
Content area centered: mx-auto, px-4
```

---

### 3.2 Navbar

```
┌──────────────────────────────────────────────────────────────────┐
│ 🎓 TCET Notes   [Home] [Subjects ▾] [Years ▾] [Sem ▾]  [Login] │
└──────────────────────────────────────────────────────────────────┘

Styling:
- Background: #0a0e1a with backdrop-blur-sm + border-bottom: 1px solid #1e293b
- Logo: "🎓 TCET Notes" — text-xl font-bold, teal colored
- Nav links: text-sm text-[#94a3b8] hover:text-[#f1f5f9] transition
- Active link: text-[#00c9a7] border-b-2 border-[#00c9a7]
- Login button: bg-gradient(teal→blue) text-white rounded-full px-4 py-2
- Dropdown menus: bg-[#111827] border border-[#1e293b] rounded-xl shadow-xl

Subjects Dropdown (on hover/click):
┌────────────────────────┐
│ Semester 1             │
│  🧪 Chemistry          │
│  ⚡ Physics            │
│  📐 Maths 1            │
│  💻 PPS (C)            │
│  📏 EGD                │
│  🔋 BEE                │
│  🖥️  EGPC              │
│  🔒 Coming Soon ×3     │
│                        │
│ Semester 2             │
│  📐 Maths 2            │
└────────────────────────┘
```

---

### 3.3 Homepage

```
┌────────────────────────────────────────────┐
│           HERO SECTION (gradient bg)       │
│                                            │
│   🎓 TCET Notes Hub                        │
│   Everything you need to crack             │
│   First Year B.E.  ←(animated typewriter) │
│                                            │
│   [ Start Learning →  ]  [ Browse Subjects]│
│   (teal gradient btn)    (outline btn)     │
│                                            │
│   ✦ 500+ Notes  ✦ 7 Subjects  ✦ Free Access│
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│   SELECT ACADEMIC YEAR                     │
│   ┌──────────┐  ┌──────────┐              │
│   │ 2025–26  │  │ 2026–27  │              │
│   │ (active) │  │ (locked) │              │
│   └──────────┘  └──────────┘              │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│   SEMESTER TABS                            │
│   [ Semester 1 ]  [ Semester 2 ]           │
│   (teal underline active)                  │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│   SUBJECTS GRID (3 cols desktop, 2 mobile) │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│   │ 🧪      │ │ ⚡      │ │ 📐      │    │
│   │Chemistry│ │ Physics │ │ Maths 1 │    │
│   │ 4 types │ │ 4 types │ │ 4 types │    │
│   └─────────┘ └─────────┘ └─────────┘    │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│   │ 💻      │ │ 📏      │ │ 🔋      │    │
│   │  PPS    │ │  EGD    │ │  BEE    │    │
│   └─────────┘ └─────────┘ └─────────┘    │
│   ┌─────────┐ ┌───────────────────────┐  │
│   │ 🖥️      │ │  🔒 Coming Soon  ×3  │  │
│   │  EGPC   │ └───────────────────────┘  │
│   └─────────┘                            │
└────────────────────────────────────────────┘
```

---

### 3.4 Subject Card (Component)

```
┌─────────────────────────────┐
│  🧪                         │  ← Large emoji icon (48px)
│                             │
│  Chemistry                  │  ← text-xl font-semibold text-white
│  Engineering Chemistry      │  ← text-sm text-muted
│                             │
│  ┌──────┐ ┌──────┐         │
│  │Notes │ │ PDFs │         │  ← colored mini-badges
│  └──────┘ └──────┘         │
│  ┌──────┐ ┌──────┐         │
│  │ PYQ  │ │Video │         │
│  └──────┘ └──────┘         │
│                             │
│  [ Open Subject →  ]        │  ← teal CTA button
└─────────────────────────────┘

Card styles:
- bg: #111827
- border: 1px solid #1e293b
- border-radius: 16px (rounded-2xl)
- hover: border-color → #00c9a7, box-shadow: 0 0 20px rgba(0,201,167,0.15)
- transition: all 300ms ease
```

---

### 3.5 Subject Page (After Clicking a Subject)

```
┌─────────────────────────────────────────────────────┐
│  ← Back   🧪 Chemistry — Semester 1, 2025–26        │
│           Tap a section to explore                  │
├─────────────────────────────────────────────────────┤
│  [ 📓 Notes ] [ 📄 PDFs ] [ 📝 PYQ ] [ 🎬 Videos ] │
│     ↑ Active tab has teal underline + white text    │
├─────────────────────────────────────────────────────┤
│  TAB CONTENT AREA:                                  │
│                                                     │
│  IF NOT LOGGED IN:                                  │
│  ┌─────────────────────────────────┐               │
│  │  🔒 Login to Access This Content│               │
│  │  [ Login with Google ] or Email │               │
│  │  It's free — takes 10 seconds   │               │
│  └─────────────────────────────────┘               │
│                                                     │
│  IF LOGGED IN (Notes tab example):                  │
│  ┌──────────────────────────────────────┐          │
│  │ 📄 Unit 1 — Atomic Structure.pdf     │          │
│  │ 📥 Download  👁️ View    2.3 MB        │          │
│  ├──────────────────────────────────────┤          │
│  │ 📄 Unit 2 — Chemical Bonding.pdf     │          │
│  │ 📥 Download  👁️ View    1.8 MB        │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│  (View opens PDF inline below the list — react-pdf)│
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │         PDF VIEWER (react-pdf)       │          │
│  │  [◀ Prev]  Page 1 of 24  [Next ▶]   │          │
│  │  [─────────────────────────────]    │          │
│  └──────────────────────────────────────┘          │
├─────────────────────────────────────────────────────┤
│  💬 AI STUDY ASSISTANT  [⭐ PREMIUM]                 │
│  ┌───────────────────────────────────────────────┐ │
│  │  Ask anything from Chemistry notes...         │ │
│  │                                               │ │
│  │  🔒 Unlock for ₹49/month  [ Subscribe ]       │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

### 3.6 AI Chat Widget (Paid Users)

```
┌──────────────────────────────────────────────┐
│  🤖 Chemistry AI  ●  Powered by Gemini 2.0   │
│  Answers from your TCET notes only           │
├──────────────────────────────────────────────┤
│                                              │
│  [BOT] Hi Rohan! Ask me anything from       │
│        Chemistry Semester 1 notes. 🧪        │
│                                              │
│  [YOU] Explain hybridisation                 │
│                                              │
│  [BOT] According to your Unit 3 notes,      │
│        hybridisation is the mixing of...    │
│                                              │
├──────────────────────────────────────────────┤
│  [Type your question...          ] [Send ▶] │
└──────────────────────────────────────────────┘

Styles:
- Container: bg-[#111827] rounded-2xl border border-[#1e293b]
- Bot bubble: bg-[#1a2235] text-white rounded-xl rounded-tl-none
- User bubble: bg-gradient(teal→blue) text-white rounded-xl rounded-tr-none
- Input: bg-[#0a0e1a] border border-[#1e293b] rounded-full px-4 focus:border-[#00c9a7]
- Send button: bg-[#00c9a7] hover:bg-[#00b896] rounded-full
```

---

### 3.7 Login Page

```
┌──────────────────────────────────────┐
│                                      │
│   🎓  TCET Notes Hub                 │
│                                      │
│   Login to access notes,            │
│   PDFs, PYQs & videos               │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 📧 Email                     │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 🔒 Password                  │   │
│  └──────────────────────────────┘   │
│                                      │
│  [ Login ]                          │
│                                      │
│  ──────── or ────────               │
│                                      │
│  [ 🔵 Continue with Google ]        │
│                                      │
│  Don't have an account? Sign Up     │
└──────────────────────────────────────┘

Card: bg-[#111827], rounded-2xl, max-w-sm, mx-auto, shadow-2xl
Input: bg-[#0a0e1a] border border-[#1e293b] rounded-xl
Login btn: bg-gradient(#00c9a7 → #0ea5e9) full width
Google btn: bg-white text-gray-800 rounded-full border
```

---

## 4. Component States

### Subject Card — 3 States
1. **Active:** Normal card with hover glow (teal)
2. **Coming Soon:** Same card but greyed out, opacity-50, lock icon overlay, no hover effect
3. **New Badge:** Orange "NEW" badge in top-right corner for freshly uploaded subjects

### Content Tabs — 3 States
1. **Active Tab:** text-[#00c9a7] border-b-2 border-[#00c9a7] bg-transparent
2. **Inactive Tab:** text-[#94a3b8] hover:text-white
3. **Empty Tab:** Shows "No content yet — check back soon 📭"

### AI Chat Widget — 3 States
1. **Locked (Free User):** Blurred/dimmed, lock icon, ₹49 CTA
2. **Unlocked (Paid):** Full chat interface
3. **Loading:** Typing indicator (3 animated dots in bot bubble)

---

## 5. Mobile Responsiveness

| Screen Size | Layout Change |
|---|---|
| < 640px (Mobile) | Single column cards, no side ads, hamburger menu |
| 640–1024px (Tablet) | 2-col cards, no side ads, inline ads between sections |
| > 1024px (Desktop) | 3-col cards + sticky side ads |
| > 1280px | Side ads widen to 200px, content area expands |

---

## 6. Micro-interactions & Animations

- **Page load:** Fade-in + slight upward slide (framer-motion, duration: 400ms)
- **Card hover:** border-color teal + subtle green glow shadow
- **Button click:** scale(0.97) for 150ms feedback
- **Tab switch:** Slide indicator moves with spring animation
- **Login wall:** Modal overlays with backdrop blur + fade-in
- **PDF loading:** Skeleton loader (pulsing grey block) while PDF fetches
- **AI typing:** Three dots bounce animation before bot response

---

## 7. Ad Placement Strategy

```
Desktop:
  Left sidebar:  160×600 (skyscraper) — sticky, aligned to content top
  Right sidebar: 160×600 (skyscraper) — sticky

Mobile (ads between content):
  After hero section:       320×50 (mobile banner)
  Between subject grid:     320×100 (inline ad after row 2)
  Above footer:             320×100

Subject page (mobile):
  Between content tabs:     320×50 banner

Key Rule: PDFs always render INSIDE the layout — ads always visible.
Never use window.open() or target="_blank" for any content.
```

---

## 8. Favicon & Branding

```
Logo Text:   "TCET Notes" 
Logo Icon:   🎓 (can replace with custom SVG later)
Favicon:     Teal graduation cap icon, 32×32px
OG Image:    1200×630 — dark bg + "TCET Notes Hub" + tagline
             (used for WhatsApp/link previews — great for sharing)

Tagline:     "Study Smarter. Score Higher."
```

---

## 9. Empty States

- **No files uploaded yet:** `📭 No content here yet — check back soon!` (centered, muted text)
- **Coming Soon subject:** `🔒 This subject will be available soon. You'll be notified!`
- **AI not subscribed:** `⭐ Unlock the AI Study Assistant for ₹49/month`
- **Not logged in:** `🔒 Create a free account to access all content`
