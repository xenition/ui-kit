import * as React from 'react';
import type { PaywallScreenProps } from './PaywallScreen';
/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV2Props = PaywallScreenProps;
/**
 * Value-first paywall — V2. Leads with a bold, tinted hero (brand medallion +
 * outcome headline over a token-derived scrim), then the benefit list, optional
 * trial strip and plans, with the price CTA pinned to the bottom so the ask
 * lands only after the value is read. Composes {@link TrialBanner},
 * {@link PlanSelector} and the CTA. Everything above the pinned bar scrolls.
 * Same props as {@link PaywallScreen}. Token-pure.
 */
export declare function PaywallScreenV2({ title, subtitle, valueProps, plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, style, }: PaywallScreenV2Props): React.ReactElement;
//# sourceMappingURL=PaywallScreenV2.d.ts.map