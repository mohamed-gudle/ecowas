import { NextRequest, NextResponse } from "next/server"
import ExcelJS from "exceljs"
import type { FinancialModel } from "@/lib/financial-agent-store"

export async function POST(req: NextRequest) {
    try {
        const model: FinancialModel = await req.json()

        const workbook = new ExcelJS.Workbook()
        workbook.creator = "ECOWAS Summit Financial Agent"
        workbook.created = new Date()

        // Summary Sheet
        const summarySheet = workbook.addWorksheet("Executive Summary", {
            properties: { tabColor: { argb: "FF10B981" } },
        })

        // Add header
        summarySheet.mergeCells("A1:F1")
        const titleCell = summarySheet.getCell("A1")
        titleCell.value = model.opportunityTitle
        titleCell.font = { size: 18, bold: true, color: { argb: "FF1F2937" } }
        titleCell.alignment = { horizontal: "center" }

        summarySheet.mergeCells("A2:F2")
        summarySheet.getCell("A2").value = `Financial Model - Generated ${new Date().toLocaleDateString()}`
        summarySheet.getCell("A2").alignment = { horizontal: "center" }

        // Key Metrics
        summarySheet.addRow([])
        summarySheet.addRow(["KEY VALUATION METRICS"])
        summarySheet.getCell("A4").font = { bold: true, size: 14 }

        const metricsData = [
            ["Net Present Value (NPV)", `$${(model.metrics.npv / 1e6).toFixed(2)}M`],
            ["Internal Rate of Return (IRR)", `${(model.metrics.irr * 100).toFixed(1)}%`],
            ["Payback Period", `${model.metrics.paybackPeriod.toFixed(1)} years`],
            ["Profitability Index", model.metrics.profitabilityIndex.toFixed(2)],
            ["WACC", `${(model.metrics.wacc * 100).toFixed(1)}%`],
            ["Terminal Value", `$${(model.metrics.terminalValue / 1e6).toFixed(2)}M`],
            ["Enterprise Value", `$${(model.metrics.enterpriseValue / 1e6).toFixed(2)}M`],
        ]

        metricsData.forEach((row) => {
            const newRow = summarySheet.addRow(row)
            newRow.getCell(1).font = { bold: true }
            newRow.getCell(2).numFmt = '"$"#,##0.00'
        })

        // Assumptions Sheet
        const assumptionsSheet = workbook.addWorksheet("Assumptions", {
            properties: { tabColor: { argb: "FF3B82F6" } },
        })

        assumptionsSheet.addRow(["MODEL ASSUMPTIONS"])
        assumptionsSheet.getCell("A1").font = { bold: true, size: 14 }
        assumptionsSheet.addRow([])

        const assumptionsData = [
            ["Assumption", "Value", "Notes"],
            ["Discount Rate", `${(model.assumptions.discountRate * 100).toFixed(1)}%`, "WACC-based"],
            ["Revenue Growth Rate", `${(model.assumptions.growthRate * 100).toFixed(1)}%`, "Annual"],
            ["Terminal Growth Rate", `${(model.assumptions.terminalGrowthRate * 100).toFixed(1)}%`, "Perpetuity"],
            ["Corporate Tax Rate", `${(model.assumptions.taxRate * 100).toFixed(1)}%`, "ECOWAS average"],
            ["Inflation Rate", `${(model.assumptions.inflationRate * 100).toFixed(1)}%`, "Regional average"],
            ["Project Life", `${model.assumptions.projectYears} years`, ""],
            ["Construction Period", `${model.assumptions.constructionPeriod} years`, "No revenue"],
            ["Operating Margin", `${(model.assumptions.operatingMargin * 100).toFixed(1)}%`, "EBITDA margin"],
            ["CAPEX Intensity", `${(model.assumptions.capexIntensity * 100).toFixed(1)}%`, "As % of revenue"],
            ["Working Capital Days", `${model.assumptions.workingCapitalDays} days`, ""],
        ]

        assumptionsData.forEach((row, index) => {
            const newRow = assumptionsSheet.addRow(row)
            if (index === 0) {
                newRow.eachCell((cell) => {
                    cell.font = { bold: true }
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFE5E7EB" },
                    }
                })
            }
        })

        assumptionsSheet.columns = [
            { width: 25 },
            { width: 15 },
            { width: 30 },
        ]

        // Projections Sheet
        const projectionsSheet = workbook.addWorksheet("Financial Projections", {
            properties: { tabColor: { argb: "FF8B5CF6" } },
        })

        projectionsSheet.addRow(["FINANCIAL PROJECTIONS ($ thousands)"])
        projectionsSheet.getCell("A1").font = { bold: true, size: 14 }
        projectionsSheet.addRow([])

        // Header row
        const projHeaders = [
            "Year",
            "Revenue",
            "Operating Costs",
            "EBITDA",
            "Depreciation",
            "EBIT",
            "Taxes",
            "Net Income",
            "CAPEX",
            "WC Change",
            "Free Cash Flow",
            "Discounted CF",
        ]
        const headerRow = projectionsSheet.addRow(projHeaders)
        headerRow.eachCell((cell) => {
            cell.font = { bold: true }
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF1F2937" },
            }
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } }
        })

        // Data rows
        model.projections.forEach((proj) => {
            projectionsSheet.addRow([
                proj.year,
                proj.revenue / 1000,
                proj.operatingCosts / 1000,
                proj.ebitda / 1000,
                proj.depreciation / 1000,
                proj.ebit / 1000,
                proj.taxes / 1000,
                proj.netIncome / 1000,
                proj.capex / 1000,
                proj.workingCapitalChange / 1000,
                proj.freeCashFlow / 1000,
                proj.discountedCashFlow / 1000,
            ])
        })

        // Format number columns
        for (let col = 2; col <= 12; col++) {
            projectionsSheet.getColumn(col).numFmt = "#,##0"
            projectionsSheet.getColumn(col).width = 15
        }
        projectionsSheet.getColumn(1).width = 8

        // Sensitivity Analysis Sheet
        const sensitivitySheet = workbook.addWorksheet("Sensitivity Analysis", {
            properties: { tabColor: { argb: "FFFBBF24" } },
        })

        sensitivitySheet.addRow(["SENSITIVITY ANALYSIS"])
        sensitivitySheet.getCell("A1").font = { bold: true, size: 14 }
        sensitivitySheet.addRow([])

        const sensHeaders = ["Scenario", "Discount Rate", "Growth Rate", "NPV ($M)", "IRR (%)"]
        const sensHeaderRow = sensitivitySheet.addRow(sensHeaders)
        sensHeaderRow.eachCell((cell) => {
            cell.font = { bold: true }
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFBBF24" },
            }
        })

        model.sensitivityAnalysis.forEach((scenario) => {
            sensitivitySheet.addRow([
                scenario.name,
                `${scenario.discountRate}%`,
                `${scenario.growthRate}%`,
                (scenario.npv / 1e6).toFixed(2),
                scenario.irr.toFixed(1),
            ])
        })

        sensitivitySheet.columns.forEach((col) => {
            col.width = 18
        })

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer()

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="${model.opportunityTitle.replace(/[^a-z0-9]/gi, "_")}_Financial_Model.xlsx"`,
            },
        })
    } catch (error) {
        console.error("Excel Export Error:", error)
        return NextResponse.json({ error: "Failed to generate Excel file" }, { status: 500 })
    }
}
