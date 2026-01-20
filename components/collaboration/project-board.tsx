import { Task, Status } from "./types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MoreHorizontal } from "lucide-react"

interface ProjectBoardProps {
    tasks: Task[]
}

const columns: { id: Status; label: string; color: string }[] = [
    { id: "todo", label: "To Do", color: "bg-slate-500" },
    { id: "in-progress", label: "In Progress", color: "bg-blue-500" },
    { id: "review", label: "In Review", color: "bg-purple-500" },
    { id: "complete", label: "Complete", color: "bg-green-500" },
]

export function ProjectBoard({ tasks }: ProjectBoardProps) {
    const getTasksByStatus = (status: Status) => tasks.filter((t) => t.status === status)

    return (
        <div className="grid grid-cols-4 gap-4 h-full">
            {columns.map((col) => (
                <div key={col.id} className="flex flex-col h-full rounded-xl bg-muted/30 border border-border/50">
                    <div className="p-3 border-b border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${col.color}`} />
                            <span className="font-semibold text-sm">{col.label}</span>
                            <Badge variant="secondary" className="text-xs h-5 px-1.5 min-w-[1.25rem] justify-center ml-1">
                                {getTasksByStatus(col.id).length}
                            </Badge>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                        {getTasksByStatus(col.id).map(task => (
                            <div key={task.id} className="bg-card p-3 rounded-lg shadow-sm border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className={`text-[10px] py-0 h-5 border-0 capitalize 
                            ${task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                                task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-700'}`}>
                                        {task.priority}
                                    </Badge>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                                <h4 className="font-medium text-sm mb-3 leading-tight">{task.title}</h4>
                                <div className="flex items-center justify-between mt-auto">
                                    <Avatar className="w-6 h-6">
                                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                            {task.assignee.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
