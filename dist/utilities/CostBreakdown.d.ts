import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export type CostBreakdownTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export interface CostBreakdownSlice {
    /** Line item name (e.g. "Energy", "Delivery", "Taxes"). */
    label: string;
    /** This item's amount, in integer **cents**. */
    amountCents: number;
    /** Semantic tone used for its segment + legend dot (default cycles). */
    tone?: CostBreakdownTone;
}
export interface CostBreakdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Card heading (default "Cost breakdown"). */
    title?: string;
    /** The line items that sum to the total. */
    slices: CostBreakdownSlice[];
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * Where the bill goes (web parity) — the clean, trust-first breakdown card: the
 * title + the summed total (integer cents via `formatMoney`), a single
 * horizontal stacked bar whose segments are widthed by each slice's share, and a
 * legend listing a tone dot, the label, the amount, and its `formatPct` share.
 * Color-coding is meaningful here — each slice carries a soft, semantic tone.
 * Token-only colors.
 */
export declare const CostBreakdown: React.ForwardRefExoticComponent<CostBreakdownProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CostBreakdown.d.ts.map