import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Rate structure family — an ordered, non-color signal via glyph + label. */
export type RatePlanVariant = 'fixed' | 'variable' | 'time-of-use' | 'tiered' | 'green';
export interface RatePlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Plan name (e.g. "SimpleSave 12"). */
    name: string;
    /** Rate structure — drives the glyph + label (default `fixed`). */
    variant?: RatePlanVariant;
    /**
     * Price per metered unit in integer **cents** (e.g. 1299 → "$12.99"). Kept as
     * cents so the printed rate never drifts.
     */
    rateCents: number;
    /** Unit the rate is charged per (e.g. "kWh"). */
    unit: string;
    /** Contract term / cadence label (e.g. "12-month term"). */
    term?: string;
    /** Bullet list of plan features. */
    features?: string[];
    /** Marks the plan as the current/selected one (adds a badge + accent ring). */
    selected?: boolean;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Select button label (default "Choose plan"). Hidden when no `onSelect`. */
    selectLabel?: string;
    /** Fires when the plan is chosen. */
    onSelect?: () => void;
}
/**
 * A selectable rate-plan card: a per-unit price headline (integer cents via
 * `formatMoney`, so it never drifts), a rate-structure glyph + label, an optional
 * feature list, and a select action. The `selected` state is conveyed by **a
 * badge + label + an accent ring** (never color alone). The select `Button`
 * renders only when `onSelect` is supplied. Every color traces to a `--xen-*`
 * token — no literals. Web parity of the native `RatePlanCard`.
 */
export declare const RatePlanCard: React.ForwardRefExoticComponent<RatePlanCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RatePlanCard.d.ts.map