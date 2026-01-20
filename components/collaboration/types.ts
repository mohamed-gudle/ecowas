export type Priority = "low" | "medium" | "high" | "urgent"
export type Status = "todo" | "in-progress" | "review" | "complete"

export interface Task {
    id: string
    title: string
    assignee: {
        name: string
        avatar?: string
    }
    priority: Priority
    status: Status
    dueDate: string
    team: string
}

export const mockTasks: Task[] = [
    {
        id: "1",
        title: "Draft Keynote Speech for Opening Ceremony",
        assignee: { name: "Sarah Connor" },
        priority: "high",
        status: "in-progress",
        dueDate: "2026-02-15",
        team: "Content",
    },
    {
        id: "2",
        title: "Finalize Security Clearance for VIPs",
        assignee: { name: "John Wick" },
        priority: "urgent",
        status: "todo",
        dueDate: "2026-02-10",
        team: "Security",
    },
    {
        id: "3",
        title: "Catering Vendor Selection",
        assignee: { name: "Gordon Ramsay" },
        priority: "medium",
        status: "review",
        dueDate: "2026-03-01",
        team: "Logistics",
    },
    {
        id: "4",
        title: "Social Media Campaign Launch",
        assignee: { name: "Emily Cooper" },
        priority: "high",
        status: "complete",
        dueDate: "2026-01-20",
        team: "Media",
    },
    {
        id: "5",
        title: "Sponsorship Deck Update",
        assignee: { name: "Jerry Maguire" },
        priority: "medium",
        status: "todo",
        dueDate: "2026-02-28",
        team: "Partnership",
    },
]
