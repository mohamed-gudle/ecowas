"use client"

import { motion } from "framer-motion"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area,
    Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Percent,
    Clock,
    Target,
    BarChart3,
    LineChartIcon,
    Table,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { FinancialModel } from "@/lib/financial-agent-store"
import { formatCurrency } from "@/lib/financial-utils"

interface FinancialModelViewerProps {
    model: FinancialModel
}

export function FinancialModelViewer({ model }: FinancialModelViewerProps) {
    // Prepare chart data
    const projectionChartData = model.projections.map((p) => ({
        year: `Y${p.year}`,
        Revenue: p.revenue / 1e6,
        EBITDA: p.ebitda / 1e6,
        "Net Income": p.netIncome / 1e6,
        "Free Cash Flow": p.freeCashFlow / 1e6,
    }))

    const cashFlowChartData = model.projections.map((p) => ({
        year: `Y${p.year}`,
        "Operating CF": (p.netIncome + p.depreciation) / 1e6,
        CAPEX: -p.capex / 1e6,
        "Free Cash Flow": p.freeCashFlow / 1e6,
    }))

    const waterfallData = [
        { name: "Revenue", value: model.projections[model.projections.length - 1]?.revenue / 1e6 || 0, fill: "hsl(var(--chart-1))" },
        { name: "Op Costs", value: -model.projections[model.projections.length - 1]?.operatingCosts / 1e6 || 0, fill: "hsl(var(--chart-2))" },
        { name: "EBITDA", value: model.projections[model.projections.length - 1]?.ebitda / 1e6 || 0, fill: "hsl(var(--chart-3))" },
        { name: "D&A", value: -model.projections[model.projections.length - 1]?.depreciation / 1e6 || 0, fill: "hsl(var(--chart-4))" },
        { name: "Taxes", value: -model.projections[model.projections.length - 1]?.taxes / 1e6 || 0, fill: "hsl(var(--chart-5))" },
        { name: "Net Income", value: model.projections[model.projections.length - 1]?.netIncome / 1e6 || 0, fill: "hsl(var(--primary))" },
    ]

    const sensitivityData = model.sensitivityAnalysis.map((s) => ({
        name: s.name,
        NPV: s.npv / 1e6,
        IRR: s.irr,
    }))

    const isPositiveNPV = model.metrics.npv > 0
    const isGoodIRR = model.metrics.irr > model.assumptions.discountRate

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Financial Model: {model.opportunityTitle}
                    </CardTitle>
                    <Badge variant={isPositiveNPV ? "default" : "destructive"}>
                        {isPositiveNPV ? "Investment Viable" : "Review Required"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "p-4 rounded-xl border",
                            isPositiveNPV ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign className={cn("w-4 h-4", isPositiveNPV ? "text-emerald-500" : "text-red-500")} />
                            <span className="text-xs text-muted-foreground">NPV</span>
                        </div>
                        <p className={cn("text-2xl font-bold", isPositiveNPV ? "text-emerald-500" : "text-red-500")}>
                            {formatCurrency(model.metrics.npv)}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={cn(
                            "p-4 rounded-xl border",
                            isGoodIRR ? "bg-blue-500/10 border-blue-500/20" : "bg-yellow-500/10 border-yellow-500/20"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Percent className={cn("w-4 h-4", isGoodIRR ? "text-blue-500" : "text-yellow-500")} />
                            <span className="text-xs text-muted-foreground">IRR</span>
                        </div>
                        <p className={cn("text-2xl font-bold", isGoodIRR ? "text-blue-500" : "text-yellow-500")}>
                            {(model.metrics.irr * 100).toFixed(1)}%
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-xl border bg-purple-500/10 border-purple-500/20"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <span className="text-xs text-muted-foreground">Payback</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-500">{model.metrics.paybackPeriod.toFixed(1)} yrs</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-xl border bg-primary/10 border-primary/20"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Profitability Index</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{model.metrics.profitabilityIndex.toFixed(2)}x</p>
                    </motion.div>
                </div>

                {/* Tabs for different views */}
                <Tabs defaultValue="projections" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="projections" className="gap-2">
                            <LineChartIcon className="w-4 h-4" />
                            Projections
                        </TabsTrigger>
                        <TabsTrigger value="cashflow" className="gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Cash Flow
                        </TabsTrigger>
                        <TabsTrigger value="sensitivity" className="gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Sensitivity
                        </TabsTrigger>
                        <TabsTrigger value="data" className="gap-2">
                            <Table className="w-4 h-4" />
                            Data
                        </TabsTrigger>
                    </TabsList>

                    {/* Projections Chart */}
                    <TabsContent value="projections">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Revenue, EBITDA & Net Income Projections ($M)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={projectionChartData}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorEBITDA" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis dataKey="year" className="text-xs" />
                                            <YAxis className="text-xs" tickFormatter={(v) => `$${v}M`} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    borderColor: "hsl(var(--border))",
                                                    borderRadius: "8px",
                                                }}
                                                formatter={(value: number) => [`$${value.toFixed(1)}M`, ""]}
                                            />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="Revenue"
                                                stroke="hsl(var(--chart-1))"
                                                fill="url(#colorRevenue)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="EBITDA"
                                                stroke="hsl(var(--chart-2))"
                                                fill="url(#colorEBITDA)"
                                                strokeWidth={2}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Net Income"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                                dot={{ fill: "hsl(var(--primary))" }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Cash Flow Chart */}
                    <TabsContent value="cashflow">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Cash Flow Analysis ($M)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={cashFlowChartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis dataKey="year" className="text-xs" />
                                            <YAxis className="text-xs" tickFormatter={(v) => `$${v}M`} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    borderColor: "hsl(var(--border))",
                                                    borderRadius: "8px",
                                                }}
                                                formatter={(value: number) => [`$${value.toFixed(1)}M`, ""]}
                                            />
                                            <Legend />
                                            <Bar dataKey="Operating CF" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="CAPEX" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="Free Cash Flow" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Sensitivity Analysis */}
                    <TabsContent value="sensitivity">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Sensitivity Analysis - NPV by Scenario</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={sensitivityData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis type="number" className="text-xs" tickFormatter={(v) => `$${v}M`} />
                                            <YAxis type="category" dataKey="name" className="text-xs" width={100} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    borderColor: "hsl(var(--border))",
                                                    borderRadius: "8px",
                                                }}
                                                formatter={(value: number, name: string) =>
                                                    name === "NPV" ? [`$${value.toFixed(1)}M`, "NPV"] : [`${value.toFixed(1)}%`, "IRR"]
                                                }
                                            />
                                            <Legend />
                                            <Bar dataKey="NPV" radius={[0, 4, 4, 0]}>
                                                {sensitivityData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            entry.name === "Base Case"
                                                                ? "hsl(var(--primary))"
                                                                : entry.name.includes("Optimistic") || entry.name.includes("High Growth") || entry.name.includes("Low Discount")
                                                                    ? "hsl(var(--chart-1))"
                                                                    : "hsl(var(--chart-2))"
                                                        }
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Sensitivity Table */}
                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="py-2 text-left font-medium">Scenario</th>
                                                <th className="py-2 text-right font-medium">Discount Rate</th>
                                                <th className="py-2 text-right font-medium">Growth Rate</th>
                                                <th className="py-2 text-right font-medium">NPV</th>
                                                <th className="py-2 text-right font-medium">IRR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {model.sensitivityAnalysis.map((scenario) => (
                                                <tr key={scenario.name} className="border-b border-muted">
                                                    <td className="py-2 font-medium">{scenario.name}</td>
                                                    <td className="py-2 text-right">{scenario.discountRate}%</td>
                                                    <td className="py-2 text-right">{scenario.growthRate}%</td>
                                                    <td className={cn("py-2 text-right font-medium", scenario.npv > 0 ? "text-emerald-500" : "text-red-500")}>
                                                        {formatCurrency(scenario.npv)}
                                                    </td>
                                                    <td className={cn("py-2 text-right font-medium", scenario.irr > model.assumptions.discountRate * 100 ? "text-blue-500" : "text-yellow-500")}>
                                                        {scenario.irr.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Data Table */}
                    <TabsContent value="data">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Financial Projections ($000s)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="py-2 px-2 text-left font-medium sticky left-0 bg-muted/50">Year</th>
                                                <th className="py-2 px-2 text-right font-medium">Revenue</th>
                                                <th className="py-2 px-2 text-right font-medium">Op Costs</th>
                                                <th className="py-2 px-2 text-right font-medium">EBITDA</th>
                                                <th className="py-2 px-2 text-right font-medium">D&A</th>
                                                <th className="py-2 px-2 text-right font-medium">EBIT</th>
                                                <th className="py-2 px-2 text-right font-medium">Taxes</th>
                                                <th className="py-2 px-2 text-right font-medium">Net Inc</th>
                                                <th className="py-2 px-2 text-right font-medium">CAPEX</th>
                                                <th className="py-2 px-2 text-right font-medium">FCF</th>
                                                <th className="py-2 px-2 text-right font-medium">DCF</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {model.projections.map((p) => (
                                                <tr key={p.year} className="border-b border-muted hover:bg-muted/30">
                                                    <td className="py-1.5 px-2 font-medium sticky left-0 bg-card">{p.year}</td>
                                                    <td className="py-1.5 px-2 text-right">{(p.revenue / 1000).toLocaleString()}</td>
                                                    <td className="py-1.5 px-2 text-right text-red-500">({(p.operatingCosts / 1000).toLocaleString()})</td>
                                                    <td className="py-1.5 px-2 text-right">{(p.ebitda / 1000).toLocaleString()}</td>
                                                    <td className="py-1.5 px-2 text-right text-muted-foreground">({(p.depreciation / 1000).toLocaleString()})</td>
                                                    <td className="py-1.5 px-2 text-right">{(p.ebit / 1000).toLocaleString()}</td>
                                                    <td className="py-1.5 px-2 text-right text-red-500">({(p.taxes / 1000).toLocaleString()})</td>
                                                    <td className="py-1.5 px-2 text-right font-medium">{(p.netIncome / 1000).toLocaleString()}</td>
                                                    <td className="py-1.5 px-2 text-right text-red-500">({(p.capex / 1000).toLocaleString()})</td>
                                                    <td className={cn("py-1.5 px-2 text-right font-medium", p.freeCashFlow >= 0 ? "text-emerald-500" : "text-red-500")}>
                                                        {(p.freeCashFlow / 1000).toLocaleString()}
                                                    </td>
                                                    <td className={cn("py-1.5 px-2 text-right", p.discountedCashFlow >= 0 ? "text-blue-500" : "text-red-500")}>
                                                        {(p.discountedCashFlow / 1000).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Assumptions Summary */}
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-xs text-muted-foreground">Discount Rate</p>
                                        <p className="font-medium">{(model.assumptions.discountRate * 100).toFixed(1)}%</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-xs text-muted-foreground">Growth Rate</p>
                                        <p className="font-medium">{(model.assumptions.growthRate * 100).toFixed(1)}%</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-xs text-muted-foreground">Tax Rate</p>
                                        <p className="font-medium">{(model.assumptions.taxRate * 100).toFixed(1)}%</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-xs text-muted-foreground">Operating Margin</p>
                                        <p className="font-medium">{(model.assumptions.operatingMargin * 100).toFixed(1)}%</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-xs text-muted-foreground">Project Life</p>
                                        <p className="font-medium">{model.assumptions.projectYears} years</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
