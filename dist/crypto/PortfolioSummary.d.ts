import * as React from 'react';
import type { ChartColor } from '../charts/internal';
/** One slice of the allocation donut. */
export interface AllocationSlice {
    /** Asset label (e.g. `ETH`). */
    label: string;
    /** Share weight (fiat value or percentage — the donut normalizes). */
    value: number;
    /** Optional semantic color; falls back to a cycled palette. */
    color?: ChartColor;
}
export interface PortfolioSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Total portfolio value in integer **cents**. */
    totalCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** 24h change in integer **cents** (signed → tone). */
    changeCents?: number;
    /** 24h change as a percentage (signed → tone; ▲/▼ glyph so not color-only). */
    changePct?: number;
    /** Allocation breakdown → a reused {@link DonutChart} + {@link Legend}. */
    allocations?: AllocationSlice[];
    /** Skeleton state while the portfolio loads. */
    loading?: boolean;
}
/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a {@link Legend}. All amounts are integer cents
 * — no float drift. Empty `allocations` simply hides the chart. Web parity of
 * the native `PortfolioSummary`.
 */
export declare const PortfolioSummary: React.ForwardRefExoticComponent<PortfolioSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioSummary.d.ts.map