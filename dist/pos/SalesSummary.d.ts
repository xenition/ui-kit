import * as React from 'react';
/** One entry in the optional top-sellers list. */
export interface SalesSummaryTopItem {
    /** Product / line name. */
    name: string;
    /** Units sold in the period. */
    count: number;
}
export interface SalesSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Gross takings for the period, in integer **cents** — the big near-white numeral. */
    grossCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Transaction count for the period. Shown as a frosted stat tile when set. */
    transactions?: number;
    /** Period label for the hero (default `"Today"`). */
    period?: string;
    /** Net takings (after refunds), in integer **cents**. Shown as a frosted stat tile when set. */
    netCents?: number;
    /** Refunds issued in the period, in integer **cents**. Shown as a frosted stat tile when set. */
    refundsCents?: number;
    /** Best-selling lines for the period — rendered as a compact frosted list when non-empty. */
    topItems?: readonly SalesSummaryTopItem[];
    /** Percentage change vs the prior comparable period (e.g. `12.5` → up 12.5%). Rendered as a signed delta pill when set. */
    deltaPct?: number;
}
/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero** (web parity of
 * the native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the `period` label, the **big near-white gross numeral** (integer cents
 * via `formatMoney`), and an optional signed `deltaPct` pill vs the prior period.
 * Transactions, net, and refunds read as frosted glass stat tiles
 * (`bg-primary-50/15 border-primary-50/30`); `topItems` render as a compact
 * frosted list. Every color derives from the brand ramp via `--xen-*` classes +
 * gradient utilities — no literals, light + dark safe.
 */
export declare const SalesSummary: React.ForwardRefExoticComponent<SalesSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SalesSummary.d.ts.map