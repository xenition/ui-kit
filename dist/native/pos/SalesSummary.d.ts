import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One entry in the optional top-sellers list. */
export interface SalesSummaryTopItem {
    /** Product / line name. */
    name: string;
    /** Units sold in the period. */
    count: number;
}
export interface SalesSummaryProps {
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
    /** Optional container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero**. A confident
 * brand gradient (`registerGradient`) carries the `period` label, the **big
 * near-white gross numeral** (integer cents via `formatMoney`), and an optional
 * signed `deltaPct` pill vs the prior period. Transactions, net, and refunds read
 * as frosted glass stat tiles; `topItems` render as a compact frosted list. Every
 * color derives from the brand ramp via `useXenitionTheme()` — no literals, light
 * + dark safe.
 */
export declare function SalesSummary({ grossCents, currency, transactions, period, netCents, refundsCents, topItems, deltaPct, style, }: SalesSummaryProps): React.ReactElement;
//# sourceMappingURL=SalesSummary.d.ts.map