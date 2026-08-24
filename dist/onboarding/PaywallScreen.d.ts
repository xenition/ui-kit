import * as React from 'react';
import type { BillingPeriod, PlanTier } from './types';
export interface PaywallValueProp {
    /** Leading glyph for the value row. */
    icon?: string;
    /** Outcome the user gets (design.md §47) — not a feature name. */
    text: string;
}
export interface PaywallScreenProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Value-first headline (e.g. `'Do your best work, faster'`). */
    title: string;
    /** Supporting line under the headline. */
    subtitle?: string;
    /** The "why upgrade" list, shown before any price (design.md §27). */
    valueProps?: PaywallValueProp[];
    /** Plans to choose from. When present, renders the inline {@link PlanSelector}. */
    plans?: PlanTier[];
    /** Selected tier id (controlled). */
    selectedPlanId?: string;
    /** Fires with the clicked tier id. */
    onSelectPlan?: (planId: string) => void;
    /** Billing cadence (controlled). Default `'annual'` — annual leads on paywalls. */
    billingPeriod?: BillingPeriod;
    /** Fires when the monthly/annual toggle changes. */
    onBillingPeriodChange?: (period: BillingPeriod) => void;
    /** Savings pill copy beside the annual toggle. */
    annualSavingsLabel?: string;
    /** Optional trial strip above the value list. */
    trial?: {
        title: string;
        subtitle?: string;
        daysLeft?: number;
    };
    /** Primary CTA copy. Default `'Start free trial'`. */
    ctaLabel?: string;
    /** Fires on the primary CTA. */
    onSubscribe?: () => void;
    /** Show a spinner on the CTA while purchase is in flight. */
    loading?: boolean;
    /** Fine print under the CTA (e.g. cancel-anytime, terms). */
    footnote?: string;
    /** Dismiss ("Maybe later") link copy. Hidden without `onDismiss`. */
    dismissLabel?: string;
    /** Fires on dismiss. */
    onDismiss?: () => void;
}
/**
 * Value-first paywall — leads with outcomes and the value list, then the plans,
 * then the price and CTA, so the ask lands only after the value is clear
 * (paywall-after-value, design.md §27-28). Composes {@link TrialBanner},
 * {@link PlanSelector} and the primary CTA, with an optional "Maybe later"
 * escape. The body scrolls while the CTA stays pinned. All colors token-bound.
 * No literal colors.
 */
export declare const PaywallScreen: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreen.d.ts.map