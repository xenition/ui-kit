import * as React from 'react';
import { type PaywallScreenProps } from './PaywallScreen';
/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV3Props = PaywallScreenProps;
/**
 * Value-first paywall — V3, the **compact** line. No hero panel: a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the plan tiers stack as rows rather than a card pair. Sized for a bottom
 * sheet or a short screen, with the CTA still pinned (§5) — a paywall's ask must
 * never leave the fold, sheet or not.
 *
 * `showHero` is honoured as an opt-*in* here (it defaults to off for this line),
 * so a host that wants the panel back can ask for it.
 *
 * Stays inside its own design line: the plan rows are {@link PlanSelectorV3},
 * not the base selector, because an app that picks V3 picks it for every surface
 * it sees. {@link TrialBanner} has no alternate, so the base one is the whole
 * line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
export declare function PaywallScreenV3({ title, subtitle, illustration, logoGlyph, showHero, features, featuresTitle, featureRail, valueFraming, valueProps, plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, style, }: PaywallScreenV3Props): React.ReactElement;
//# sourceMappingURL=PaywallScreenV3.d.ts.map