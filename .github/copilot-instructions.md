# AI Coding Assistant Instructions

## Project Overview

ECOWAS Climate Summit 2026 digital platform - a Next.js 16 + TypeScript application built with shadcn/ui components and Zustand state management. The app manages accreditation, programme scheduling, dealroom investments, speaker materials, and event logistics.

## Architecture & Key Patterns

### Stack & Configuration

- **Framework**: Next.js 16 with App Router (RSC enabled)
- **Styling**: Tailwind CSS 4.1 + CSS variables for theming
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives + Lucide icons
- **State Management**: Zustand with localStorage persistence (`ecowas-summit-storage`)
- **Forms**: React Hook Form + Zod validation
- **Data Visualization**: Recharts
- **Package Manager**: pnpm
- **Path Alias**: `@/*` resolves to project root

### Project Structure

```
app/                          # Next.js App Router pages
├── dashboard/               # Admin command center with layout
│   ├── accreditation/      # Attendee badge & clearance management
│   ├── analytics/          # Event metrics & reporting
│   ├── collaboration/      # Team chat & coordination
│   ├── finance/            # Budget & payments
│   ├── governance/         # Decision tracking
│   ├── programme/          # Session scheduling
│   ├── risks/              # Risk management dashboard
│   └── vip/               # Protocol & VIP management
├── auth/                    # Authentication flows (login, delegate, secretariat)
├── dealroom/               # Investment projects & matchmaking
├── speaker/                # Speaker portal with sessions & materials
└── (public pages)          # Landing, about, contact, media

components/
├── dashboard/              # Command center widgets (stats, queues, alerts)
├── landing/               # Homepage sections (hero, CTA, speakers preview)
└── ui/                    # Reusable shadcn/ui components
```

### Data Model (Zustand Store)

Core types in `lib/store.ts`:

- **User**: Email, name, organization, country, **role** (12 types), accreditation status, badge ID, access zones
- **Session**: Type (plenary/panel/workshop/masterclass/side_event/ministerial), speakers, streaming/recording flags, 10-state lifecycle (draft→archived)
- **Project**: Dealroom investment projects with readiness scores and sector classification
- **Notification**: Typed alerts with read/unread state

Store persists to localStorage - check `useAppStore` hook for mutations.

## Development Workflow

### Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint on all files
```

### Building & TypeScript

- TypeScript strict mode enabled
- Build ignores TS errors (`next.config.mjs`: `ignoreBuildErrors: true`)
- Next.js experimental flag `missingSuspenseWithCSRBailout: false` enables shadcn/ui Tabs/Select with useSearchParams

### Styling Convention

```tsx
// Use cn() helper to merge Tailwind + conditional classes
import { cn } from "@/lib/utils"
className={cn("base-class", condition && "conditional-class")}
```

CSS variables for theme colors defined in `app/globals.css` - use in Tailwind with `bg-primary`, `text-accent`, etc.

## Component Patterns

### Client/Server Split

- Mark interactive components with `"use client"` (forms, state mutations, event handlers)
- Server components for static content & data fetching
- Dashboard pages use `"use client"` for sidebar navigation + state

### shadcn/ui Components

Located in `components/ui/`. Use as drop-in replacements:

- Form elements: Button, Input, Select, Checkbox, Textarea
- Layout: Card, Tabs, Accordion, Sheet, Dialog
- Data display: Table, Progress, Slider, Badge
- Composed in dashboard components (e.g., `OverviewStats` uses `StatCard` with custom styling)

### State Management

```tsx
import { useAppStore } from "@/lib/store";

// In component:
const { currentUser, theme, toggleTheme, addNotification } = useAppStore();

// Mutations persist to localStorage automatically via Zustand persist middleware
```

## Role-Based Features

12 user roles define feature access:

- **super_admin**, **accreditation_lead**, **programme_lead**: Full command center access
- **finance_officer**, **logistics_lead**: Finance/operations modules
- **protocol_vip**, **speaker**, **moderator**: Specialized portals
- **attendee**, **investor**, **exhibitor**, **sponsor**, **media**, **vendor**: Limited access

Check `User.role` type before rendering privileged UI sections.

## Common Tasks

**Add new dashboard section**:

1. Create page in `app/dashboard/{section}/page.tsx`
2. Create widget component in `components/dashboard/{widget}.tsx`
3. Update sidebar navigation in `sidebar.tsx` (add to `navItems` array)
4. Use `cn()` for styling + shadcn/ui components

**Add authentication check**:

```tsx
const { isAuthenticated, currentUser } = useAppStore();
if (!isAuthenticated) redirect("/auth/login");
```

**Create a form**:
Use React Hook Form + Zod in a `"use client"` component:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
});
```

**Fetch & display data**:
Use Zustand store actions (addSession, updateProject) or server-side data fetching with async Server Components.

## Files to Study

- `lib/store.ts` - Full state schema & Zustand setup
- `components/dashboard/sidebar.tsx` - Navigation structure & role filtering
- `app/dashboard/page.tsx` - Layout & grid composition pattern
- `components/ui/button.tsx` - shadcn/ui component example with CVA variants
