import * as React from 'react';
import { type PaywallScreenProps } from './PaywallScreen';
/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV2Props = PaywallScreenProps;
/**
 * Value-first paywall — V2, the **editorial** line. The hero runs full-bleed to
 * the top edge with no inset panel, and the content sheet rises over it with a
 * rounded lip so the headline overlaps the artwork. Below the fold line sit the
 * trial strip, the §8 feature rows, the value-framing block and the V2 plan
 * cards, with the CTA pinned (§5).
 *
 * Stays inside its own design line: the plan cards are {@link PlanSelectorV2},
 * not the base selector, because an app that picks V2 picks it for every
 * surface it sees. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
export declare function PaywallScreenV2({ title, subtitle, illustration, logoGlyph, showHero, features, featuresTitle, featureRail, valueFraming, valueProps, plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, style, }: PaywallScreenV2Props): React.ReactElement;
//# sourceMappingURL=PaywallScreenV2.d.ts.map