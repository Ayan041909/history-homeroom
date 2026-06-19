# History Homeroom

An elite full-stack educational platform for learning history with live tutoring, immersive content, and a passionate community.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** + custom CSS variables (Black+Gold / White+Gold theme)
- **Framer Motion** — all animations, transitions, parallax effects
- **Firebase** — Auth (Email + Google OAuth) + Firestore database
- **shadcn/ui** — Base UI components
- **Lucide React** — Icons
- **Embla Carousel** — Historical events carousel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Sign-in methods → **Email/Password** and **Google**
4. Create a **Firestore Database**
5. Deploy the security rules from `firestore.rules`
6. Copy your project config into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** Without Firebase configured, the app runs in **demo mode** — all UI features work but data won't persist.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, Metrics, Carousel, Pricing, Preview, Guide |
| `/login` | Sign in / Sign up (Student or Tutor, Email or Google) |
| `/home` | Student dashboard — Progress, Badges, Tutoring booking, FAQ |
| `/tutor` | Tutor dashboard — Stats, Schedule, Classes, Student roster |

## Features

- **Dark mode** (Black + Gold) / **Light mode** (White + Gold) — toggleable
- **Animated landing page** — particle background, word-by-word headline, scroll-triggered sections
- **Historical events carousel** — 6 major events, auto-play, draggable
- **Parallax card effects** — historical figures & places
- **3-tier pricing** — Free / Plus ($9.99) / Premium ($19.99) with 1-week trial
- **Student progress tracking** — animated counters for lessons, assignments, quizzes
- **Badge system** — 10 unlockable achievement badges
- **Tutoring booking** — Group, 1-on-1, Peer Workshop with seat selection
- **AI Chatbot** — Scripted navigation assistant with quick suggestions
- **Accessibility bar** — Font size controls, high contrast, reduce motion
- **ARIA labels** throughout, keyboard-navigable, focus rings in gold

## Deploying to Firebase Hosting

```bash
npm run build
npx firebase deploy
```

## Customizing Content

All content data lives in `src/lib/mockData.ts`:
- `HISTORICAL_EVENTS` — 6 carousel entries
- `HISTORICAL_FIGURES` — 4 preview cards (people + places)
- `MOCK_SESSIONS` — 15 tutoring session slots (5 per type)
- `FAQ_ITEMS` — 8 FAQ entries
