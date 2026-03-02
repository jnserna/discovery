# InnerBloom – Implementation Plan

## Context

Greenfield bilingual (EN/ES) personal psychology companion web app. Deployed as a Next.js app under the subpath `/innerbloom` on an existing site. Users can access the chat anonymously; logged-in users unlock journaling, personal goals, memory collections, and persistent chat history. The AI layer uses Google Gemini as primary model with Claude and OpenAI as silent fallbacks via Vercel AI SDK.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| UI | shadcn/ui + Tailwind CSS |
| Theming | next-themes (dark/light) |
| i18n | next-intl (EN/ES) |
| AI | Vercel AI SDK — Gemini primary, Claude + OpenAI commented fallbacks |
| Auth + DB | Firebase Auth + Firestore + Storage |
| Animations | Framer Motion |
| Forms | react-hook-form + zod |
| Subpath | `basePath: '/innerbloom'` in next.config.ts |

---

## File Structure

```
/
├── next.config.ts                   ← basePath: '/innerbloom'
├── middleware.ts                    ← next-intl locale routing
├── knowledge-base/
│   └── mental-health.md             ← RAG placeholder (user will fill)
├── messages/
│   ├── en.json
│   └── es.json
├── app/
│   ├── layout.tsx                   ← Root: ThemeProvider, IntlProvider, GlobalContextProvider, FirebaseProvider
│   ├── globals.css                  ← Tailwind base + CSS vars for palette
│   ├── page.tsx                     ← Landing page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── chat/page.tsx
│   ├── journal/
│   │   ├── page.tsx                 ← Auth-protected list
│   │   └── [id]/page.tsx            ← Entry editor
│   ├── assessments/
│   │   ├── page.tsx                 ← Assessment hub
│   │   ├── enneagram/page.tsx
│   │   ├── attachment/page.tsx
│   │   ├── big-five/page.tsx
│   │   ├── love-languages/page.tsx
│   │   ├── values/page.tsx
│   │   ├── strengths/page.tsx
│   │   └── couples/page.tsx
│   ├── profile/page.tsx             ← Personality Profile Builder
│   ├── wheel-of-life/page.tsx       ← Auth-protected
│   ├── goals/page.tsx               ← Auth-protected
│   ├── memories/page.tsx            ← Auth-protected
│   └── api/
│       ├── chat/route.ts            ← Streaming AI chat endpoint
│       ├── rag/route.ts             ← RAG search + LLM answer
│       └── horoscope/route.ts       ← On-demand horoscope
├── components/
│   ├── ui/                          ← shadcn generated components
│   ├── layout/
│   │   ├── Header.tsx               ← Nav + lang toggle + auth button
│   │   ├── MobileNav.tsx
│   │   └── CrisisFooter.tsx         ← Hotlines EN/ES always visible
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── ChatInput.tsx
│   ├── journal/
│   │   ├── EntryCard.tsx
│   │   ├── EntryEditor.tsx          ← rich text + image + URL
│   │   └── MoodPicker.tsx
│   ├── assessments/
│   │   ├── QuizEngine.tsx           ← Reusable multi-step quiz shell
│   │   ├── ResultCard.tsx
│   │   └── AssessmentHub.tsx
│   ├── profile/
│   │   ├── ProfileForm.tsx
│   │   ├── InsightsDashboard.tsx
│   │   └── HoroscopeWidget.tsx
│   ├── wheel-of-life/
│   │   └── WheelChart.tsx           ← Radar chart (recharts)
│   └── shared/
│       ├── AuthGuard.tsx            ← Redirects unauthenticated users
│       ├── LanguageToggle.tsx
│       ├── ThemeToggle.tsx
│       └── DisclaimerBanner.tsx
├── lib/
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   └── db.ts                    ← Firestore helpers
│   ├── ai/
│   │   ├── models.ts                ← Fallback chain config
│   │   ├── prompts.ts               ← System prompt builder
│   │   └── rag.ts                   ← KB search + context injection
│   ├── i18n/
│   │   └── config.ts
│   └── context/
│       └── GlobalContext.tsx        ← Enneatype, Zodiac, Language (persisted to localStorage)
└── public/
    └── fonts/, icons/
```

---

## Implementation Phases

### Phase 1 — Project Foundation
**Goal:** Runnable skeleton with routing, theming, and i18n.

1. Init Next.js 15 with TypeScript: `npx create-next-app@latest innerbloom --typescript --tailwind --app`
2. `next.config.ts`: set `basePath: '/innerbloom'`, `trailingSlash: true`
3. Install and init shadcn/ui: `npx shadcn@latest init`
4. Install: `next-themes`, `next-intl`, `framer-motion`, `firebase`, `@ai-sdk/google`, `@ai-sdk/anthropic`, `@ai-sdk/openai`, `ai`, `react-hook-form`, `zod`, `recharts`, `lucide-react`
5. Configure `middleware.ts` for next-intl locale detection (EN/ES default EN)
6. Create `messages/en.json` and `messages/es.json` with all string keys
7. Set up CSS custom properties in `globals.css` for the therapeutic color palette:
   - Primary: soft teal `#4A9B8E`
   - Accent: warm sage `#7BAF7A`
   - Neutral warm: `#F5F0E8`
   - Dark bg: `#1A1F2E`
8. Create `.env.local.example` with all required keys

---

### Phase 2 — Design System & Layout
**Goal:** Cohesive visual shell across all pages.

**Critical files:** `app/layout.tsx`, `app/globals.css`, `components/layout/Header.tsx`, `components/layout/CrisisFooter.tsx`

1. Root layout wraps: `ThemeProvider` → `FirebaseProvider` → `IntlProvider` → `GlobalContextProvider`
2. `Header.tsx`: logo + nav links + `LanguageToggle` + `ThemeToggle` + discrete top-right auth button (inline login popover on landing)
3. `MobileNav.tsx`: bottom tab bar on mobile, slide-out drawer on tablet
4. `CrisisFooter.tsx`: always-visible strip with crisis hotlines (988 Suicide & Crisis Lifeline EN, 800-290-0024 ES)
5. `DisclaimerBanner.tsx`: dismissible banner "This is not a replacement for professional therapy"
6. Smooth page transitions via Framer Motion `AnimatePresence` in root layout

---

### Phase 3 — Firebase Auth
**Goal:** Login/signup flows, session state, protected routes.

**Critical files:** `lib/firebase/config.ts`, `lib/firebase/auth.ts`, `components/shared/AuthGuard.tsx`

1. `lib/firebase/config.ts`: initialize Firebase app from env vars
2. `lib/firebase/auth.ts`: `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut`, `useAuthState` hook
3. `/app/(auth)/login/page.tsx` and `/signup/page.tsx`: shadcn Form + react-hook-form + zod
4. Landing page: inline login popover anchored to top-right auth button (no redirect required)
5. `AuthGuard.tsx`: client component that redirects to `/login` if unauthenticated
6. Wrap protected pages: journal, goals, memories, wheel-of-life

---

### Phase 4 — Global Context & AI Infrastructure
**Goal:** Shared state for enneatype/zodiac/language + AI model chain.

**Critical files:** `lib/context/GlobalContext.tsx`, `lib/ai/models.ts`, `lib/ai/prompts.ts`, `lib/ai/rag.ts`

1. **GlobalContext** (React context + localStorage persistence):
   ```ts
   { enneatype, zodiacSign, language, profile } // profile = saved Profile Builder inputs
   ```
   Stored in `localStorage` so anonymous users retain context across sessions. Synced to Firestore for logged-in users.

2. **`lib/ai/models.ts`** — Model fallback chain:
   ```ts
   import { google } from '@ai-sdk/google'
   import { anthropic } from '@ai-sdk/anthropic' // commented fallback
   import { openai } from '@ai-sdk/openai'        // commented fallback
   export const primaryModel = google('gemini-2.0-flash-exp')
   // export const secondaryModel = anthropic('claude-opus-4-6')
   // export const tertiaryModel = openai('gpt-4o')
   ```

3. **`lib/ai/prompts.ts`** — System prompt builder:
   - Takes GlobalContext as input
   - Outputs: empathetic persona + user profile summary + language instruction
   - Language rule: *"Think, reason, and plan in English. If the user's selected language is Spanish, translate your final response to Spanish before sending."*
   - Injects crisis resource reminder

4. **`lib/ai/rag.ts`** — Knowledge base retrieval:
   - Reads `knowledge-base/mental-health.md` at startup (or on demand)
   - Splits into sections by `##` headings
   - Simple relevance check: keyword overlap between user query and section titles/content
   - If relevant sections found → inject as context with `Source: InnerBloom Knowledge Base`
   - If no match → proceed with normal LLM (no restriction, no forced citation)

---

### Phase 5 — Landing Page
**Goal:** Functional first impression; immediate value without requiring login.

**Critical file:** `app/page.tsx`

Sections (top to bottom):
1. Hero: tagline + CTA → "Start Talking" (opens chat), language toggle prominent
2. Inline auth: short login form in top-right popover
3. Quick chat preview: embedded single-turn chat card ("How are you feeling today?")
4. Feature cards: Chat, Journal, Assessments, Profile Builder — each card links to its section
5. Disclaimer banner (dismissible)
6. Crisis footer always present

---

### Phase 6 — Conversational Therapy Companion
**Goal:** Streaming, empathetic chat with anonymous + authenticated modes.

**Critical files:** `app/chat/page.tsx`, `app/api/chat/route.ts`, `components/chat/ChatInterface.tsx`

1. `app/api/chat/route.ts`:
   - Uses `streamText` from Vercel AI SDK
   - Builds system prompt from GlobalContext (passed as headers or body)
   - Calls RAG before LLM: prepend relevant KB sections to messages if found
   - Model: `primaryModel` from `lib/ai/models.ts`
2. `ChatInterface.tsx`:
   - `useChat` hook from `ai/react`
   - Auto-scroll, typing indicator, message bubbles
   - Anonymous users: messages in component state only (no persistence)
   - Logged-in users: messages saved to Firestore collection `users/{uid}/chatSessions`
3. Session sidebar for logged-in users (previous sessions list)

---

### Phase 7 — RAG / Knowledge Base
**Goal:** Mental health knowledge augmentation with graceful fallback.

**Critical files:** `lib/ai/rag.ts`, `knowledge-base/mental-health.md`

1. `knowledge-base/mental-health.md`: structured placeholder with `##` sections. Sections scaffolded:
   - `## Anxiety`, `## Depression`, `## Grief`, `## Stress Management`, `## Mindfulness`, `## Sleep`, `## Relationships`, `## Self-Esteem`, `## Trauma`
   - Each section: placeholder lines with `<!-- Add content here -->` comments
2. RAG logic runs on every chat API call — injected into system context, not a separate endpoint
3. When KB content is used, the AI appends a small `Source: InnerBloom Knowledge Base` citation

---

### Phase 8 — Personality Assessments
**Goal:** Interactive quizzes that feed results back into GlobalContext.

**Critical files:** `components/assessments/QuizEngine.tsx`, `app/assessments/*/page.tsx`

**`QuizEngine.tsx`** — reusable multi-step shell:
- Props: `questions[]`, `onComplete(answers)`, `progressBar`
- Smooth step transitions (Framer Motion)
- Supports multiple choice, ranking, and slider input types

#### 8a — Enneagram (flagship assessment)
10 fear-based questions (e.g., "When you make a mistake, is the voice in your head a gentle reminder or a harsh critic?")
- Scoring: weighted answer map → type 1–9
- Results page:
  - Primary type + full description
  - Wing tendencies (adjacent types)
  - Growth arrow + stress arrow
  - Personalized development recommendations
  - Compatibility with other types
- Result saved to GlobalContext (`enneatype`) + Firestore (if logged in)

#### 8b — Attachment Style
15-question assessment → Secure / Anxious / Avoidant / Disorganized

#### 8c — Big Five (OCEAN)
20-question assessment → scores for Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism. Bar chart results.

#### 8d — Love Languages
15-question forced-choice → ranks Quality Time, Words of Affirmation, Acts of Service, Gifts, Physical Touch

#### 8e — Values Assessment
Present 20 values, user selects and ranks top 10 via drag-and-drop

#### 8f — Strengths Finder
20-question assessment → top 5 character strengths (VIA-inspired)

#### 8g — Couples Section
- **Compatibility**: Both partners take a subset of assessments; compare results side-by-side
- **Desire Profile**: Based on your profile type, "someone like X would be highly compatible with you"

---

### Phase 9 — Personality Profile Builder
**Goal:** Rich user input form → AI-generated insights dashboard.

**Critical files:** `app/profile/page.tsx`, `components/profile/ProfileForm.tsx`, `components/profile/InsightsDashboard.tsx`

**Input fields:**
- Gender (optional, select)
- Age or Birthday → auto-compute zodiac sign (stored in GlobalContext)
- Living environment (city/countryside/suburban)
- Education level
- Favorite sport/physical activities
- Hobbies and interests (multi-tag input)
- Relationship status (optional)
- Career/work situation
- Enneatype (optional, with "Find your Enneatype →" link to assessment)
- Absolute Favorite Singer
- Absolute Favorite Movie

**On submit:**
- Generate personality insights dashboard via AI (streaming, shown in `InsightsDashboard.tsx`)
- Zodiac profile section (if birthday provided)
- Lifestyle analysis
- Personalized growth suggestions
- "Get Your Horoscope" button → `onClick` calls `/api/horoscope` with zodiac sign, streams response inline
- "Save your profile" → writes to Firestore + updates GlobalContext

---

### Phase 10 — Personal Journal
**Goal:** Private diary for registered users with rich media entries.

**Critical files:** `app/journal/page.tsx`, `app/journal/[id]/page.tsx`, `components/journal/EntryEditor.tsx`

1. Entry list page: reverse-chronological cards with mood emoji, date, excerpt
2. Entry editor:
   - Date (auto-filled)
   - Mood picker (emoji/color spectrum)
   - Rich text area (free text)
   - Image upload → Firebase Storage → URL stored in Firestore
   - URL attachment field (video, speech, article link)
3. All entries stored: `users/{uid}/journalEntries/{entryId}`
4. Protected by `AuthGuard`

---

### Phase 11 — Additional Features (Auth-Protected)
**Goal:** Three lifestyle tracking sections for logged-in users.

#### 11a — Wheel of Life
- 8 life areas: Career, Finances, Health, Family, Romance, Personal Growth, Fun, Environment
- Radar chart (recharts `RadarChart`)
- User fills score 1–10 per area → chart updates live
- Save snapshot to Firestore: `users/{uid}/wheelOfLife/{snapshotId}`
- View history of past snapshots

#### 11b — Personal Goals
- CRUD list of goals
- Each goal: title, description, target date, category, status (active/done)
- Firestore: `users/{uid}/goals/{goalId}`

#### 11c — Things I Like to Remember
- User-defined collections (e.g., "Cars I've owned", "Countries I've visited")
- Each collection: list of text entries with optional image
- Firestore: `users/{uid}/memories/{collectionId}/items/{itemId}`

---

### Phase 12 — Polish & QA
**Goal:** Production-ready, accessible, performant.

1. Framer Motion: page enter/exit animations, quiz step transitions
2. Mobile audit: test on 375px (phone), 768px (tablet portrait), 1024px (tablet landscape)
3. Accessibility: ARIA labels on all interactive elements, keyboard navigation, color contrast AA
4. Performance: `next/image` for all images, lazy-load heavy components (assessments, wheel chart)
5. i18n completeness pass: ensure all UI strings are in both `en.json` and `es.json`
6. Environment check: verify `basePath: '/innerbloom'` works for all internal links (use `next/link` everywhere)

---

## Key Architectural Notes

### Subpath Support
All `next/link` and `next/image` components automatically respect `basePath`. Avoid hardcoded `/` prefix strings. Use `useRouter` from `next/navigation` for programmatic navigation.

### Language-Aware AI
Every chat/rag API route checks `GlobalContext.language`. System prompt always ends with:
> "Always reason and plan internally in English. If the user's language is Spanish (`es`), translate your final response to Spanish before outputting it."

### Anonymous vs Authenticated State
| Feature | Anonymous | Authenticated |
|---|---|---|
| Chat | ✓ (state only) | ✓ + Firestore history |
| Profile Builder | ✓ (localStorage) | ✓ + Firestore |
| Assessments | ✓ (localStorage) | ✓ + Firestore |
| Journal | ✗ | ✓ |
| Goals, Memories, Wheel | ✗ | ✓ |

### GlobalContext Object (System Prompt Injection)
```ts
interface GlobalContext {
  language: 'en' | 'es'
  enneatype: number | null          // 1-9
  zodiacSign: string | null
  profile: UserProfile | null       // Profile Builder inputs
  attachmentStyle: string | null
  bigFive: OceanScores | null
  loveLanguages: LoveLanguageRanks | null
}
```
Persisted to `localStorage`. Synced to Firestore on login. Injected into every AI system prompt.

---

## Environment Variables Required

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# AI (server-side only)
GOOGLE_GENERATIVE_AI_API_KEY=
ANTHROPIC_API_KEY=          # fallback, keep commented in models.ts
OPENAI_API_KEY=              # fallback, keep commented in models.ts
```

---

## Verification Checklist

- [ ] App loads at `localhost:3000/innerbloom`
- [ ] Language toggle switches all UI strings EN ↔ ES
- [ ] Dark/light mode persists across page refreshes
- [ ] Chat works without login (anonymous)
- [ ] Chat response language matches selected language
- [ ] Login/signup via Firebase works; user session persists
- [ ] Chat history appears for logged-in user after refresh
- [ ] Enneagram quiz completes and stores result in GlobalContext
- [ ] Profile Builder zodiac auto-computes from birthday input
- [ ] Horoscope button streams response inline
- [ ] Journal entry with image upload saves to Firebase Storage
- [ ] Wheel of Life radar chart renders and saves to Firestore
- [ ] All auth-protected pages redirect unauthenticated users
- [ ] Crisis footer visible on every page
- [ ] Mobile layout looks correct at 375px width
