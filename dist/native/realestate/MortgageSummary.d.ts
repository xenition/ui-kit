import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Tone slot for a breakdown segment — a near-white opacity step on the gradient. */
export type MortgageBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';
/** One component of the monthly payment (principal+interest, tax, insurance, HOA…). */
export interface MortgageBreakdownItem {
    /** Legend label (e.g. "Principal & interest"). */
    label: string;
    /** This component's monthly amount, in integer **cents**. */
    cents: number;
    /** Segment tone; drives the bar/legend swatch opacity. Default `primary`. */
    tone?: MortgageBreakdownTone;
}
export interface MortgageSummaryProps {
    /** Total estimated monthly payment, in integer **cents** (the hero numeral). */
    monthlyCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Payment components — a stacked token bar + frosted legend tiles. */
    breakdown?: readonly MortgageBreakdownItem[];
    /** Down-payment summary line (e.g. "20% down · $80,000"). */
    downLabel?: string;
    /** Interest-rate summary line (e.g. "6.5% APR"). */
    rateLabel?: string;
    /** Loan-term summary line (e.g. "30-yr fixed"). */
    termLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * MortgageSummary — a brand-gradient mortgage-results hero for the real-estate V4
 * "listing" line. A big near-white monthly payment numeral sits on the brand
 * gradient (`listingGradient`); the `breakdown` renders as a single stacked bar
 * of near-white opacity steps plus frosted legend tiles, and the down/rate/term
 * lines read as frosted chips. Presentational — shaped data only, nothing fetches
 * or computes amortization. Money is integer cents via `formatMoney`. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
export declare function MortgageSummary({ monthlyCents, currency, breakdown, downLabel, rateLabel, termLabel, style, }: MortgageSummaryProps): React.ReactElement;
//# sourceMappingURL=MortgageSummary.d.ts.map