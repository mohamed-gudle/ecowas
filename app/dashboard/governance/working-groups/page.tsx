"use client"

import { motion } from "framer-motion"
import { Calendar, Plus, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const workingGroups = [
  {
    id: 1,
    name: "Trade & Investment",
    lead: "Dr. Amina Okonkwo",
    members: 12,
    tasks: 8,
    completed: 6,
    nextMeeting: "Jan 18",
  },
  {
    id: 2,
    name: "Climate Action",
    lead: "Prof. Kwame Asante",
    members: 10,
    tasks: 10,
    completed: 7,
    nextMeeting: "Jan 19",
  },
  { id: 3, name: "Digital Economy", lead: "Fatou Diallo", members: 8, tasks: 6, completed: 4, nextMeeting: "Jan 20" },
  {
    id: 4,
    name: "Youth & Education",
    lead: "Ibrahim Toure",
    members: 15,
    tasks: 12,
    completed: 9,
    nextMeeting: "Jan 17",
  },
]

export default function WorkingGroupsPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Working Groups</h1>
          <p className="text-muted-foreground">Manage thematic working groups and task forces</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workingGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <Badge variant="outline">{group.members} members</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {group.lead
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{group.lead}</p>
                    <p className="text-xs text-muted-foreground">Group Lead</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Task Progress</span>
                    <span>
                      {group.completed}/{group.tasks} tasks
                    </span>
                  </div>
                  <Progress value={(group.completed / group.tasks) * 100} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Next: {group.nextMeeting}
                  </span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Eye className="w-4 h-4 mr-2" /> View Group
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

      </div>

    </div>
  )
}
