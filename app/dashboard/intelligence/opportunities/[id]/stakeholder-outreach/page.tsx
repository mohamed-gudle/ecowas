"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Users,
    Construction,
    Sparkles,
} from "lucide-react"

export default function StakeholderOutreachAgentPage() {
    const params = useParams()
    const router = useRouter()
    const opportunityId = params.id

    return (
        <div className="min-h-screen">
            <Header
                title="Stakeholder Outreach Agent"
                subtitle="Identify and engage key stakeholders"
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
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl">Stakeholder Outreach Agent</CardTitle>
                            <Badge variant="outline" className="mx-auto mt-2">
                                <Construction className="w-3 h-3 mr-1" />
                                Coming Soon
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">
                                The Stakeholder Outreach Agent will help you identify key stakeholders,
                                generate engagement strategies, and prepare for meetings with potential partners and investors.
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-purple-500" />
                                        <span className="font-medium text-sm">Stakeholder Mapping</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Identify government bodies, DFIs, private investors, and community groups
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-purple-500" />
                                        <span className="font-medium text-sm">Communication Templates</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Generate customized outreach emails and presentation materials
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-purple-500" />
                                        <span className="font-medium text-sm">Meeting Preparation</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Prepare talking points, Q&A briefs, and negotiation strategies
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-purple-500" />
                                        <span className="font-medium text-sm">Follow-up Tracking</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Track engagement history and suggest next steps
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
