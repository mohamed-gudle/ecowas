export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

import { Suspense } from "react"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import MeetingsLoader from "./meetings-loader"

const meetings = [
  {
    id: "1",
    title: "Investor Pitch: Sahel Solar Mega Farm",
    type: "virtual",
    status: "confirmed",
    date: "2024-03-15",
    time: "14:00 - 15:00",
    project: "Sahel Solar Mega Farm",
    attendees: [
      { id: "1", name: "Kwame Asante", role: "Project Developer", avatar: "/african-businessman.png" },
      {
        id: "2",
        name: "Sarah Chen",
        role: "Investment Director",
        avatar: "/asian-businesswoman.jpg",
        organization: "Africa Infrastructure Fund",
      },
      { id: "3", name: "Dr. Amadou Diallo", role: "Technical Advisor", avatar: "/african-man-professional.png" },
    ],
    agenda: "Initial pitch presentation, Q&A on technical feasibility, Discussion of financing structure",
    meetingLink: "https://meet.example.com/sahel-solar-pitch",
    notes: "",
  },
  {
    id: "2",
    title: "Due Diligence Review - Lagos Smart Grid",
    type: "in-person",
    status: "confirmed",
    date: "2024-03-16",
    time: "10:00 - 12:00",
    project: "Lagos Smart Grid Modernization",
    location: "Meeting Room A, Summit Convention Center",
    attendees: [
      { id: "4", name: "Oluwaseun Adebayo", role: "CEO, PowerGrid Africa", avatar: "/nigerian-businessman.jpg" },
      {
        id: "5",
        name: "James Wilson",
        role: "Infrastructure Analyst",
        avatar: "/businessman-glasses.jpg",
        organization: "Green Climate Partners",
      },
    ],
    agenda: "Technical due diligence review, Site visit planning, Risk assessment discussion",
    notes: "Bring technical documentation package",
  },
  {
    id: "3",
    title: "Networking: Clean Energy Investors Roundtable",
    type: "in-person",
    status: "pending",
    date: "2024-03-17",
    time: "16:00 - 18:00",
    project: null,
    location: "Executive Lounge, Summit Convention Center",
    attendees: [{ id: "6", name: "Multiple Investors", role: "Various", avatar: "/group-people.jpg" }],
    agenda: "Open networking session for clean energy project developers and investors",
    notes: "Prepare elevator pitches for all active projects",
  },
  {
    id: "4",
    title: "Follow-up: Ghana Wind Farm Financing",
    type: "virtual",
    status: "cancelled",
    date: "2024-03-14",
    time: "09:00 - 10:00",
    project: "Ghana Coastal Wind Farm",
    attendees: [{ id: "7", name: "Akua Mensah", role: "CEO, West Wind Energy", avatar: "/ghanaian-businesswoman.jpg" }],
    agenda: "Discussion of revised financing terms",
    notes: "Rescheduled to next week",
    cancellationReason: "Scheduling conflict - investor travel delay",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export default function MeetingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <MeetingsLoader />
    </Suspense>
  )
}
