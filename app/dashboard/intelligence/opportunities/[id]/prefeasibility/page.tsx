"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    ClipboardCheck,
    Construction,
    Sparkles,
} from "lucide-react"

export default function PrefeasibilityAgentPage() {
    const params = useParams()
    const router = useRouter()
    const opportunityId = params.id

    return (
        <div className="min-h-screen">
            <Header
                title="Prefeasibility Agent"
                subtitle="Technical and economic viability assessment"
            />

            <div className="p-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/dashboard/intelligence/opportunities/${opportunityId}`)}
                    className="gap-2 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Opportunity
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                                <ClipboardCheck className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl">Prefeasibility Agent</CardTitle>
                            <Badge variant="outline" className="mx-auto mt-2">
                                <Construction className="w-3 h-3 mr-1" />
                                Coming Soon
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">
                                The Prefeasibility Agent will help you conduct preliminary assessments of technical,
                                economic, and environmental viability for investment opportunities.
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium text-sm">Technical Review</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Assess engineering requirements, technology choices, and implementation challenges
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium text-sm">Market Analysis</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Evaluate market demand, competitive landscape, and growth potential
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium text-sm">Environmental Screening</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Identify environmental impacts and compliance requirements
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium text-sm">Risk Identification</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Map key risks and develop preliminary mitigation strategies
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => router.push(`/dashboard/intelligence/opportunities/${opportunityId}`)}
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Return to Opportunity
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
