import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MoreHorizontal, User as UserIcon } from "lucide-react"
import { Task, Priority, Status } from "./types"

interface ProjectListProps {
    tasks: Task[]
}

const priorityColor = {
    low: "bg-slate-500",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
}

const statusColor = {
    todo: "bg-slate-200 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    review: "bg-purple-100 text-purple-700",
    complete: "bg-green-100 text-green-700",
}

export function ProjectList({ tasks }: ProjectListProps) {
    return (
        <div className="rounded-lg border bg-card">
            <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Task Name</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Due Date</div>
            </div>
            <div className="divide-y">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors text-sm"
                    >
                        <div className="col-span-5 font-medium">{task.title}</div>
                        <div className="col-span-2 flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {task.assignee.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{task.assignee.name}</span>
                        </div>
                        <div className="col-span-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColor[task.status]}`}>
                                {task.status.replace("-", " ")}
                            </span>
                        </div>
                        <div className="col-span-1 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${priorityColor[task.priority]}`} />
                            <span className="capitalize">{task.priority}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{task.dueDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
