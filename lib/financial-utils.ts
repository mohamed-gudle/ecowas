import type {
    FinancialAssumptions,
    YearlyProjection,
    SensitivityScenario,
} from "./financial-agent-store"

/**
 * Calculate Net Present Value of cash flows
 */
export function calculateNPV(cashFlows: number[], discountRate: number): number {
    return cashFlows.reduce((npv, cf, index) => {
        return npv + cf / Math.pow(1 + discountRate, index)
    }, 0)
}

/**
 * Calculate Internal Rate of Return using Newton-Raphson method
 */
export function calculateIRR(cashFlows: number[], guess: number = 0.1): number {
    const maxIterations = 100
    const tolerance = 0.0001
    let rate = guess

    for (let i = 0; i < maxIterations; i++) {
        const npv = calculateNPV(cashFlows, rate)
        const derivative = cashFlows.reduce((sum, cf, index) => {
            return sum - (index * cf) / Math.pow(1 + rate, index + 1)
        }, 0)

        if (Math.abs(derivative) < 1e-10) break

        const newRate = rate - npv / derivative
        if (Math.abs(newRate - rate) < tolerance) {
            return newRate
        }
        rate = newRate
    }

    return rate
}

/**
 * Calculate Weighted Average Cost of Capital
 */
export function calculateWACC(
    equityWeight: number,
    debtWeight: number,
    costOfEquity: number,
    costOfDebt: number,
    taxRate: number
): number {
    return equityWeight * costOfEquity + debtWeight * costOfDebt * (1 - taxRate)
}

/**
 * Calculate payback period
 */
export function calculatePaybackPeriod(cashFlows: number[]): number {
    let cumulative = 0
    for (let i = 0; i < cashFlows.length; i++) {
        cumulative += cashFlows[i]
        if (cumulative >= 0) {
            // Linear interpolation for more precise payback
            const previousCumulative = cumulative - cashFlows[i]
            return i + (-previousCumulative / cashFlows[i])
        }
    }
    return cashFlows.length // Not recovered within projection period
}

/**
 * Calculate terminal value using Gordon Growth Model
 */
export function calculateTerminalValue(
    finalCashFlow: number,
    terminalGrowthRate: number,
    discountRate: number
): number {
    if (discountRate <= terminalGrowthRate) {
        throw new Error("Discount rate must be greater than terminal growth rate")
    }
    return (finalCashFlow * (1 + terminalGrowthRate)) / (discountRate - terminalGrowthRate)
}

/**
 * Generate yearly financial projections
 */
export function generateProjections(
    initialRevenue: number,
    initialCapex: number,
    assumptions: FinancialAssumptions
): YearlyProjection[] {
    const projections: YearlyProjection[] = []
    let cumulativeDepreciation = 0
    const depreciationPerYear = initialCapex / assumptions.projectYears

    for (let year = 0; year <= assumptions.projectYears; year++) {
        const isConstructionPhase = year < assumptions.constructionPeriod

        // Revenue grows after construction
        const revenue = isConstructionPhase
            ? 0
            : initialRevenue * Math.pow(1 + assumptions.growthRate, year - assumptions.constructionPeriod)

        // Operating costs based on margin
        const operatingCosts = revenue * (1 - assumptions.operatingMargin)
        const ebitda = revenue - operatingCosts

        // Depreciation
        const depreciation = year > 0 ? depreciationPerYear : 0
        cumulativeDepreciation += depreciation

        const ebit = ebitda - depreciation
        const taxes = Math.max(0, ebit * assumptions.taxRate)
        const netIncome = ebit - taxes

        // Capex: initial in year 0, maintenance thereafter
        const capex = year === 0 ? initialCapex : initialCapex * assumptions.capexIntensity * 0.02

        // Working capital change
        const workingCapitalChange =
            year === 0 ? 0 : (revenue - (projections[year - 1]?.revenue || 0)) * (assumptions.workingCapitalDays / 365)

        // Free cash flow
        const freeCashFlow = netIncome + depreciation - capex - workingCapitalChange

        // Discounted cash flow
        const discountedCashFlow = freeCashFlow / Math.pow(1 + assumptions.discountRate, year)

        projections.push({
            year,
            revenue: Math.round(revenue),
            operatingCosts: Math.round(operatingCosts),
            ebitda: Math.round(ebitda),
            depreciation: Math.round(depreciation),
            ebit: Math.round(ebit),
            taxes: Math.round(taxes),
            netIncome: Math.round(netIncome),
            capex: Math.round(capex),
            workingCapitalChange: Math.round(workingCapitalChange),
            freeCashFlow: Math.round(freeCashFlow),
            discountedCashFlow: Math.round(discountedCashFlow),
        })
    }

    return projections
}

/**
 * Run sensitivity analysis on discount rate and growth rate
 */
export function runSensitivityAnalysis(
    projections: YearlyProjection[],
    baseDiscountRate: number,
    baseGrowthRate: number
): SensitivityScenario[] {
    const scenarios: SensitivityScenario[] = []
    const cashFlows = projections.map((p) => p.freeCashFlow)

    // Define variations
    const variations = [
        { name: "Base Case", drDelta: 0, grDelta: 0 },
        { name: "Optimistic", drDelta: -0.02, grDelta: 0.02 },
        { name: "Pessimistic", drDelta: 0.02, grDelta: -0.02 },
        { name: "High Growth", drDelta: 0, grDelta: 0.03 },
        { name: "Low Growth", drDelta: 0, grDelta: -0.02 },
        { name: "High Discount", drDelta: 0.03, grDelta: 0 },
        { name: "Low Discount", drDelta: -0.03, grDelta: 0 },
    ]

    for (const v of variations) {
        const discountRate = baseDiscountRate + v.drDelta
        const growthRate = baseGrowthRate + v.grDelta

        // Recalculate with adjusted growth (simplified)
        const adjustedCashFlows = cashFlows.map((cf, i) => {
            if (i === 0) return cf
            const growthAdjustment = Math.pow(1 + v.grDelta, i)
            return cf * growthAdjustment
        })

        const npv = calculateNPV(adjustedCashFlows, discountRate)
        const irr = calculateIRR(adjustedCashFlows)

        scenarios.push({
            name: v.name,
            discountRate: Math.round(discountRate * 1000) / 10,
            growthRate: Math.round(growthRate * 1000) / 10,
            npv: Math.round(npv),
            irr: Math.round(irr * 1000) / 10,
        })
    }

    return scenarios
}

/**
 * Format number as currency
 */
export function formatCurrency(value: number, currency: string = "USD"): string {
    if (Math.abs(value) >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`
    } else if (Math.abs(value) >= 1e6) {
        return `$${(value / 1e6).toFixed(2)}M`
    } else if (Math.abs(value) >= 1e3) {
        return `$${(value / 1e3).toFixed(2)}K`
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
    return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Parse investment value string to number (e.g., "$8.5B" -> 8500000000)
 */
export function parseInvestmentValue(valueString: string): number {
    const cleaned = valueString.replace(/[^0-9.BMK]/g, "")
    const number = parseFloat(cleaned)

    if (valueString.includes("B")) return number * 1e9
    if (valueString.includes("M")) return number * 1e6
    if (valueString.includes("K")) return number * 1e3

    return number
}

/**
 * Get default assumptions based on sector
 */
export function getDefaultAssumptions(sector: string): FinancialAssumptions {
    const sectorDefaults: Record<string, Partial<FinancialAssumptions>> = {
        energy: {
            discountRate: 0.1,
            growthRate: 0.05,
            operatingMargin: 0.35,
            projectYears: 25,
            constructionPeriod: 3,
            capexIntensity: 0.8,
        },
        transport: {
            discountRate: 0.09,
            growthRate: 0.04,
            operatingMargin: 0.25,
            projectYears: 30,
            constructionPeriod: 4,
            capexIntensity: 0.75,
        },
        agriculture: {
            discountRate: 0.12,
            growthRate: 0.06,
            operatingMargin: 0.2,
            projectYears: 15,
            constructionPeriod: 2,
            capexIntensity: 0.6,
        },
        digital: {
            discountRate: 0.15,
            growthRate: 0.12,
            operatingMargin: 0.45,
            projectYears: 10,
            constructionPeriod: 1,
            capexIntensity: 0.4,
        },
        industry: {
            discountRate: 0.11,
            growthRate: 0.05,
            operatingMargin: 0.28,
            projectYears: 20,
            constructionPeriod: 3,
            capexIntensity: 0.7,
        },
    }

    const defaults = sectorDefaults[sector] || {}

    return {
        discountRate: defaults.discountRate ?? 0.1,
        growthRate: defaults.growthRate ?? 0.05,
        terminalGrowthRate: 0.02,
        taxRate: 0.25,
        inflationRate: 0.03,
        projectYears: defaults.projectYears ?? 20,
        constructionPeriod: defaults.constructionPeriod ?? 2,
        operatingMargin: defaults.operatingMargin ?? 0.3,
        capexIntensity: defaults.capexIntensity ?? 0.7,
        workingCapitalDays: 45,
    }
}
