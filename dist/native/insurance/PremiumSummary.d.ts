import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import type { PremiumCadence } from './PolicyCard';
/** One line in the premium breakdown. A negative `amountCents` is a credit. */
export interface PremiumLineItem {
    /** Line label (e.g. "Base premium", "Multi-policy discount", "Taxes & fees"). */
    label: string;
    /** Amount in integer **cents**; negative = discount/credit. */
    amountCents: number;
}
export interface PremiumSummaryProps {
    /** Ordered breakdown lines (base, riders, discounts, taxes …). */
    items: PremiumLineItem[];
    /**
     * Total premium in integer **cents**. When omitted it is derived by summing
     * `items`, so the printed total always reconciles with the lines shown.
     */
    totalCents?: number;
    /** Billing cadence label suffix (default `monthly`). */
    cadence?: PremiumCadence;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Loading skeleton flag — renders placeholder rows instead of data. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * An itemized premium breakdown card: labelled lines (discounts shown as
 * `success`-toned credits with a leading `−`) summing to a bold total. The
 * total defaults to the sum of `items` so it can never disagree with the lines.
 * All amounts are integer cents via `formatMoney` (two decimals, no drift), and
 * every color traces to a `SemanticColors` slot. Supports a `loading` state.
 */
export declare function PremiumSummary({ items, totalCents, cadence, currency, formatMoney: format, loading, style, }: PremiumSummaryProps): React.ReactElement;
//# sourceMappingURL=PremiumSummary.d.ts.map