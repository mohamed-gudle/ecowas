"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole =
  | "super_admin"
  | "accreditation_lead"
  | "programme_lead"
  | "finance_officer"
  | "logistics_lead"
  | "protocol_vip"
  | "media_team"
  | "risk_manager"
  | "speaker"
  | "moderator"
  | "convener"
  | "attendee"
  | "investor"
  | "exhibitor"
  | "sponsor"
  | "vendor"
  | "media"

export type AccreditationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "security_pending"
  | "security_cleared"
  | "security_rejected"
  | "approved"
  | "conditionally_approved"
  | "rejected"
  | "cancelled"

export type SessionStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "payment_pending"
  | "confirmed"
  | "scheduled"
  | "published"
  | "live"
  | "completed"
  | "outcomes_published"
  | "archived"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  organization: string
  country: string
  role: UserRole
  avatar?: string
  phone?: string
  accreditationStatus?: AccreditationStatus
  badgeId?: string
  accessZones?: string[]
}

export interface Session {
  id: string
  title: string
  type: "plenary" | "panel" | "workshop" | "masterclass" | "side_event" | "ministerial"
  description: string
  pillar: string
  date: string
  startTime: string
  endTime: string
  venue: string
  room: string
  capacity: number
  speakers: string[]
  moderator?: string
  status: SessionStatus
  streamingEnabled: boolean
  recordingEnabled: boolean
  accessPolicy: "open" | "invite_only" | "closed_door"
}

export interface Project {
  id: string
  title: string
  sector: string
  country: string
  investmentSize: string
  stage: "pipeline" | "concept" | "feasibility" | "ready" | "financing" | "funded"
  readinessScore: number
  description: string
  developer: string
  createdAt: string
}

export interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface AppState {
  currentUser: User | null
  isAuthenticated: boolean
  theme: "light" | "dark"
  notifications: Notification[]
  sessions: Session[]
  projects: Project[]

  // Actions
  setCurrentUser: (user: User | null) => void
  setAuthenticated: (value: boolean) => void
  toggleTheme: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  addSession: (session: Session) => void
  updateSession: (id: string, updates: Partial<Session>) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      theme: "light",
      notifications: [],
      sessions: [],
      projects: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      clearNotifications: () => set({ notifications: [] }),
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
        })),
      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
    }),
    {
      name: "ecowas-summit-storage",
    },
  ),
)
