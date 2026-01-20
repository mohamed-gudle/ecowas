import type { LucideIcon } from "lucide-react"
import { FileText, CheckCircle2, Video, XCircle, Mic } from "lucide-react"

export type SessionStatus = "draft" | "confirmed" | "in-progress" | "completed" | "cancelled"
export type SessionType = "plenary" | "panel" | "workshop" | "bilateral" | "networking" | "ceremony"

export interface Session {
    id: string
    title: string
    type: SessionType
    status: SessionStatus
    date: string
    startTime: string
    endTime: string
    venue: string
    room: string
    capacity: number
    registered: number
    speakers: { id: string; name: string; role: string; avatar: string }[]
    description: string
    track: string
    isLive: boolean
    hasInterpretation: boolean
    languages: string[]
}

export const sessions: Session[] = [
    {
        id: "1",
        title: "Opening Ceremony: Climate Action for Africa's Future",
        type: "ceremony",
        status: "confirmed",
        date: "2024-03-15",
        startTime: "09:00",
        endTime: "10:30",
        venue: "Main Convention Center",
        room: "Grand Ballroom",
        capacity: 2000,
        registered: 1856,
        speakers: [
            { id: "s1", name: "H.E. Bola Tinubu", role: "ECOWAS Chairman", avatar: "/african-leader-portrait.jpg" },
            {
                id: "s2",
                name: "Dr. Amina Mohammed",
                role: "UN Deputy Secretary-General",
                avatar: "/placeholder-w932o.png",
            },
        ],
        description: "Official opening of the ECOWAS Climate Summit with addresses from regional leaders.",
        track: "Main Stage",
        isLive: false,
        hasInterpretation: true,
        languages: ["English", "French", "Portuguese"],
    },
    {
        id: "2",
        title: "Renewable Energy Transition in West Africa",
        type: "panel",
        status: "confirmed",
        date: "2024-03-15",
        startTime: "11:00",
        endTime: "12:30",
        venue: "Main Convention Center",
        room: "Hall A",
        capacity: 500,
        registered: 423,
        speakers: [
            { id: "s3", name: "Prof. Fatima Diallo", role: "Energy Policy Expert", avatar: "/african-woman-professor.jpg" },
            { id: "s4", name: "Mr. Kwame Asante", role: "Solar Africa CEO", avatar: "/african-businessman.png" },
        ],
        description:
            "Expert panel discussing strategies for accelerating renewable energy adoption across ECOWAS member states.",
        track: "Energy & Infrastructure",
        isLive: false,
        hasInterpretation: true,
        languages: ["English", "French"],
    },
    {
        id: "3",
        title: "Green Finance Workshop: Accessing Climate Funds",
        type: "workshop",
        status: "draft",
        date: "2024-03-15",
        startTime: "14:00",
        endTime: "16:00",
        venue: "Main Convention Center",
        room: "Workshop Room 1",
        capacity: 100,
        registered: 67,
        speakers: [
            {
                id: "s5",
                name: "Ms. Aisha Bello",
                role: "AfDB Climate Finance Director",
                avatar: "/african-woman-finance.jpg",
            },
        ],
        description:
            "Hands-on workshop on navigating climate finance mechanisms and preparing successful funding proposals.",
        track: "Finance & Investment",
        isLive: false,
        hasInterpretation: false,
        languages: ["English"],
    },
    {
        id: "4",
        title: "Presidential Bilateral: Nigeria-Ghana Climate Partnership",
        type: "bilateral",
        status: "confirmed",
        date: "2024-03-15",
        startTime: "15:00",
        endTime: "16:00",
        venue: "VIP Wing",
        room: "State Room 1",
        capacity: 20,
        registered: 12,
        speakers: [],
        description: "High-level bilateral meeting between Nigerian and Ghanaian delegations on joint climate initiatives.",
        track: "VIP Protocol",
        isLive: false,
        hasInterpretation: true,
        languages: ["English"],
    },
    {
        id: "5",
        title: "Youth Climate Action Summit",
        type: "plenary",
        status: "in-progress",
        date: "2024-03-16",
        startTime: "09:00",
        endTime: "12:00",
        venue: "Youth Center",
        room: "Main Hall",
        capacity: 800,
        registered: 756,
        speakers: [{ id: "s6", name: "Vanessa Nakate", role: "Climate Activist", avatar: "/young-african-woman-activist.jpg" }],
        description: "Youth-led plenary focusing on the role of young Africans in driving climate action.",
        track: "Youth & Education",
        isLive: true,
        hasInterpretation: true,
        languages: ["English", "French", "Portuguese", "Arabic"],
    },
    {
        id: "6",
        title: "Networking Lunch: Private Sector Leaders",
        type: "networking",
        status: "confirmed",
        date: "2024-03-16",
        startTime: "12:30",
        endTime: "14:00",
        venue: "Main Convention Center",
        room: "Executive Dining",
        capacity: 150,
        registered: 142,
        speakers: [],
        description: "Exclusive networking opportunity for private sector delegates and potential investors.",
        track: "Business & Investment",
        isLive: false,
        hasInterpretation: false,
        languages: ["English"],
    },
]

export const tracks = [
    "All Tracks",
    "Main Stage",
    "Energy & Infrastructure",
    "Finance & Investment",
    "Youth & Education",
    "Business & Investment",
    "VIP Protocol",
]

export const sessionTypes: { value: SessionType; label: string; color: string }[] = [
    { value: "plenary", label: "Plenary", color: "bg-primary" },
    { value: "panel", label: "Panel Discussion", color: "bg-accent" },
    { value: "workshop", label: "Workshop", color: "bg-chart-1" },
    { value: "bilateral", label: "Bilateral Meeting", color: "bg-chart-2" },
    { value: "networking", label: "Networking", color: "bg-chart-3" },
    { value: "ceremony", label: "Ceremony", color: "bg-chart-4" },
]

export const statusConfig: Record<SessionStatus, { label: string; color: string; icon: any }> = {
    draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
    confirmed: { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
    "in-progress": { label: "Live Now", color: "bg-red-500/10 text-red-600 animate-pulse", icon: Video },
    completed: { label: "Completed", color: "bg-slate-500/10 text-slate-600", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export const venues = [
    { name: "Grand Ballroom", capacity: 2000, building: "Main Convention Center" },
    { name: "Hall A", capacity: 500, building: "Main Convention Center" },
    { name: "Hall B", capacity: 300, building: "Main Convention Center" },
    { name: "Workshop Room 1", capacity: 100, building: "Main Convention Center" },
    { name: "Workshop Room 2", capacity: 100, building: "Main Convention Center" },
    { name: "State Room 1", capacity: 20, building: "VIP Wing" },
    { name: "Main Hall", capacity: 800, building: "Youth Center" },
    { name: "Executive Dining", capacity: 150, building: "Main Convention Center" },
]
