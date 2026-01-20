import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Minimize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSchedulingAgentStore } from "@/lib/scheduling-agent-store"
import { AgentInterface } from "./agent-interface"

export function SchedulingAgentChat() {
    const {
        isOpen,
        setIsOpen,
    } = useSchedulingAgentStore()

    if (!isOpen) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-tr from-primary to-accent hover:shadow-primary/25"
                    size="icon"
                >
                    <Sparkles className="h-6 w-6 text-white" />
                </Button>
            </motion.div>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] shadow-2xl rounded-2xl overflow-hidden border bg-background flex flex-col"
            >
                {/* Header */}
                <div className="p-4 border-b bg-muted/40 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Scheduling Assistant</h3>
                            <p className="text-xs text-muted-foreground">Programme & Content Expert</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                            <Minimize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <AgentInterface />
            </motion.div>
        </AnimatePresence>
    )
}
