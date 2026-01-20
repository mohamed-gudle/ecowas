export type Team = "Logistics" | "Content" | "Security" | "Media" | "Partnerships"

interface Email {
    id: string
    from: string
    subject: string
    content: string
    date: string
}

interface Meeting {
    id: string
    title: string
    date: string
    summary: string
    attendees: string[]
}

interface ChatMessage {
    id: string
    user: string
    content: string
    timestamp: string
}

interface ContextData {
    emails: Email[]
    meetings: Meeting[]
    chats: ChatMessage[]
}

export const mockTeamData: Record<Team, ContextData> = {
    Logistics: {
        emails: [
            {
                id: "e1",
                from: "transport@vendors.com",
                subject: "Updated Fleet Schedule",
                content: "We have confirmed the 15 luxury vans for the VIP delegates. They will be available starting 8 AM on Day 1.",
                date: "2026-01-19 14:30"
            },
            {
                id: "e2",
                from: "venue@ecowas.org",
                subject: "Catering Setup Requirements",
                content: "The main hall needs to be cleared by 5 PM for the gala dinner setup. Please coordinate with the cleaning crew.",
                date: "2026-01-20 09:15"
            }
        ],
        meetings: [
            {
                id: "m1",
                title: "Daily Standup - Logistics",
                date: "2026-01-20 08:30",
                summary: "Discussed transport delays from airport. Action item: Contact alternative shuttle service. Venue setup is on track.",
                attendees: ["John", "Sarah", "Mike"]
            }
        ],
        chats: [
            { id: "c1", user: "Mike", content: "Has anyone heard from the badge printer vendor?", timestamp: "10:05 AM" },
            { id: "c2", user: "Sarah", content: "Yes, they said delivery is tomorrow morning.", timestamp: "10:07 AM" }
        ]
    },
    Content: {
        emails: [
            {
                id: "e3",
                from: "speakers@ecowas.org",
                subject: "Keynote Draft V2",
                content: "Attached is the second draft of the opening remarks. Please review specifically the section on renewable energy targets.",
                date: "2026-01-18 16:00"
            }
        ],
        meetings: [
            {
                id: "m2",
                title: "Content Strategy Review",
                date: "2026-01-19 11:00",
                summary: "Keynote mostly done. Panel questions need more work. Deadline for all slides is Friday.",
                attendees: ["Emily", "David", "Aisha"]
            }
        ],
        chats: [
            { id: "c3", user: "David", content: "The renewable energy stats in the Keynote seem outdated.", timestamp: "2:00 PM" },
            { id: "c4", user: "Emily", content: "I'll double check with the research team.", timestamp: "2:05 PM" }
        ]
    },
    Security: {
        emails: [
            {
                id: "e4",
                from: "police@local.gov",
                subject: "Route Clearance Approved",
                content: "The VIP route from airport to hotel has been approved for convoy movement.",
                date: "2026-01-20 08:00"
            }
        ],
        meetings: [],
        chats: [
            { id: "c5", user: "Chief", content: "All units to report for briefing at 0600 tomorrow.", timestamp: "5:00 PM" }
        ]
    },
    Media: {
        emails: [],
        meetings: [
            {
                id: "m3",
                title: "Press Briefing Prep",
                date: "2026-01-20 10:00",
                summary: "Press kits are printed. Social media schedule approved. Livestream test scheduled for 2 PM.",
                attendees: ["Lisa", "Tom"]
            }
        ],
        chats: []
    },
    Partnerships: {
        emails: [
            {
                id: "e5",
                from: "sponsor@bank.com",
                subject: "Logo Assets",
                content: "Please find attached our high-res logo for the backdrop.",
                date: "2026-01-19 10:00"
            }
        ],
        meetings: [],
        chats: [
            { id: "c6", user: "Alex", content: "Did we get the logo from the Platinum sponsor?", timestamp: "11:00 AM" }
        ]
    }
}
