import * as React from 'react';
import type { BillingPeriod, PlanTier } from './types';
/** Two-up cards (§7) or the original stacked list. */
export type PlanSelectorLayout = 'cards' | 'list';
export interface PlanSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Tiers to choose from. Empty renders the empty state. */
    plans: PlanTier[];
    /** Currently selected tier id (controlled). */
    selectedPlanId?: string;
    /** Fires with the clicked tier id. */
    onSelectPlan?: (planId: string) => void;
    /** Active billing cadence (controlled). Default `'monthly'`. */
    billingPeriod?: BillingPeriod;
    /** Fires when the monthly/annual toggle changes. */
    onBillingPeriodChange?: (period: BillingPeriod) => void;
    /** Show the monthly/annual toggle. Default `true`. */
    showBillingToggle?: boolean;
    /** Savings pill copy shown beside the annual toggle (e.g. `'Save 20%'`). */
    annualSavingsLabel?: string;
    /**
     * `'cards'` is the reference paywall pair — two-up, equal width, the selected
     * one filled (§7). `'list'` is the older stacked rendering, still the right
     * shape for a settings screen. Default `'cards'`; the compact v3 line
     * defaults to `'list'` instead.
     */
    layout?: PlanSelectorLayout;
}
/**
 * The monthly/annual cadence toggle plus its savings pill — identical across
 * the three lines, so it lives in one place.
 */
export declare function BillingToggle({ billingPeriod, onBillingPeriodChange, annualSavingsLabel, spread, }: {
    billingPeriod: BillingPeriod;
    onBillingPeriodChange?: (period: BillingPeriod) => void;
    annualSavingsLabel?: string;
    spread?: boolean;
}): React.ReactElement;
/**
 * One §7 plan card. Selected takes the `primary` fill plus the 2px ring;
 * unselected stays outlined. The "BEST"/"SAVE 20%" badge sits top-right of the
 * card it belongs to.
 */
export declare function PlanCard({ plan, price, selected, onSelect, }: {
    plan: PlanTier;
    price: string;
    selected: boolean;
    onSelect: () => void;
}): React.ReactElement;
/**
 * Subscription tier picker — a `radiogroup` of plan cards plus an optional
 * monthly/annual {@link Segmented} toggle that swaps every card's price.
 *
 * The default is the reference pair (§7): two-up, equal width, `radius.lg`, the
 * selected card taking the `primary` fill and a 2px ring while the others stay
 * outlined, with a tier's "BEST"/"SAVE 20%" badge top-right of its own card. A
 * lone plan takes the full width rather than sitting in half a grid.
 * `layout="list"` restores the older stacked rows for dense contexts.
 *
 * Each card is a `radio` announcing its `checked` state; prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list with the {@link EmptyState}. No literal colors.
 */
export declare const PlanSelector: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelector.d.ts.map