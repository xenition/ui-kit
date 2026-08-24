import * as React from 'react';
import type { BillingPeriod, PlanTier } from './types';
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
}
/**
 * Subscription tier picker — a `radiogroup` of clickable plan cards plus an
 * optional monthly/annual {@link Segmented} toggle that swaps every card's
 * price. The selected card lifts to the primary border and shows a check; each
 * card is a `radio` announcing its `checked` state to screen readers. Prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list with the {@link EmptyState}. No literal colors.
 */
export declare const PlanSelector: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelector.d.ts.map