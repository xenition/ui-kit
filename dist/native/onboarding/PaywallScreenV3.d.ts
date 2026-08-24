import * as React from 'react';
import type { PaywallScreenProps } from './PaywallScreen';
/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV3Props = PaywallScreenProps;
/**
 * Value-first paywall — V3. Frames the upgrade as a comparison table: a
 * prominent trial banner up top, then a two-column "free vs premium" grid where
 * each value prop is a row (— for the free tier, ✓ for the premium one), with
 * the premium column tinted to draw the eye. Plans and the pinned CTA follow.
 * Column names are pulled from `plans` when present. Same props as
 * {@link PaywallScreen}. Token-pure.
 */
export declare function PaywallScreenV3({ title, subtitle, valueProps, plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, style, }: PaywallScreenV3Props): React.ReactElement;
//# sourceMappingURL=PaywallScreenV3.d.ts.map