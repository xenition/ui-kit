import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DonutChartColor } from '../charts';
/** One slice of the allocation donut. */
export interface AllocationSlice {
    /** Asset label (e.g. `ETH`). */
    label: string;
    /** Share weight (fiat value or percentage — the donut normalizes). */
    value: number;
    /** Optional semantic color; falls back to a cycled palette. */
    color?: DonutChartColor;
}
export interface PortfolioSummaryProps {
    /** Total portfolio value in integer **cents**. */
    totalCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** 24h change in integer **cents** (signed → tone). */
    changeCents?: number;
    /** 24h change as a percentage (signed → tone; ▲/▼ glyph so not color-only). */
    changePct?: number;
    /** Allocation breakdown → a reused {@link DonutChart}. */
    allocations?: AllocationSlice[];
    /** Skeleton state while the portfolio loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a legend. All amounts are integer cents — no
 * float drift. Empty `allocations` simply hides the chart.
 */
export declare function PortfolioSummary({ totalCents, currency, changeCents, changePct, allocations, loading, style, }: PortfolioSummaryProps): React.ReactElement;
//# sourceMappingURL=PortfolioSummary.d.ts.map