/**
 * Shared data shapes for the `@xenition/ui/native/onboarding` module. These are
 * plain, presentational contracts — the app owns the data and passes it in;
 * nothing here fetches or persists. Copy is caller-supplied so hosts stay in
 * control of localization and outcome-oriented wording (design.md §47).
 */

import type * as React from 'react';

/** Billing cadence for a paid plan. */
export type BillingPeriod = 'monthly' | 'annual';

/** One slide in the {@link OnboardingSlides} intro carousel. */
export interface OnboardingSlide {
  /** Stable key for list rendering. */
  id: string;
  /** Headline — keep it an outcome, not a feature name (design.md §47). */
  title: string;
  /** One-line supporting description. */
  description?: string;
  /** Optional emoji/glyph rendered in the hero medallion. */
  icon?: string;
  /**
   * Artwork for **this slide's** hero panel.
   *
   * `OnboardingSlides` took one `illustration` prop for the whole carousel, so
   * a three-slide intro showed the same picture three times while the copy
   * changed underneath it — which reads as a broken screen, not as a carousel.
   * The V4 line prefers this per-slide node and falls back to the carousel-wide
   * prop, then to the {@link icon} medallion, so nothing existing moves.
   */
  illustration?: React.ReactNode;
}

/** A selectable subscription tier for {@link PlanSelector} / {@link PaywallScreen}. */
export interface PlanTier {
  /** Stable key returned to `onSelectPlan`. */
  id: string;
  /** Display name (e.g. `Pro`, `Team`). */
  name: string;
  /** Price for the monthly cadence, already formatted (e.g. `$12`). */
  monthlyPrice: string;
  /** Price for the annual cadence, already formatted (e.g. `$120`). */
  annualPrice: string;
  /** Sub-price caption (e.g. `per month, billed yearly`). */
  priceCaption?: string;
  /** Short outcome-oriented value lines shown under the price. */
  features?: string[];
  /** Renders the tier as the recommended/highlighted card. */
  highlighted?: boolean;
  /** Optional ribbon copy (e.g. `Most popular`, `Best value`). */
  badge?: string;
  /**
   * The undiscounted monthly price, already formatted (e.g. `$4.99`).
   *
   * Rendered struck through beside {@link monthlyPrice} by the V4 line's
   * `'offer'` layout. Optional and ignored when it is absent or not actually
   * higher than the price it is compared against — a "was" price that is not
   * more than the "now" price is a dark pattern, and the component declines to
   * draw one.
   */
  compareAtMonthlyPrice?: string;
  /** The undiscounted annual price. Same rules as {@link compareAtMonthlyPrice}. */
  compareAtAnnualPrice?: string;
  /**
   * Short savings copy shown as a pill beside the plan name (e.g. `20% OFF`).
   *
   * Drawn in `success`, because saving money is the good outcome — never in
   * `danger`, which is the tone that means something went wrong (§35.4).
   */
  savingsLabel?: string;
  /**
   * A smaller unit the price also divides into, already formatted (e.g.
   * `$0.07/day`). Right-aligned against the price in the `'offer'` layout.
   *
   * Pre-formatted rather than computed: dividing a price by a period is a
   * pricing and rounding decision, and a component that guesses at one will
   * eventually display a number the host's billing page contradicts.
   */
  perUnitPrice?: string;
}

/** One social/SSO button offered on {@link SignInScreen}. */
export interface SignInProvider {
  /** Stable key handed back to the press/click callback (e.g. `'google'`). */
  id: string;
  /** Button copy (e.g. `'Continue with Google'`). */
  label: string;
  /**
   * Optional leading emoji/glyph. The kit ships no brand marks — an app that
   * needs a real Google/Apple logo passes its own asset alongside this screen.
   */
  glyph?: string;
}

/** A pickable interest/topic chip for {@link InterestPicker}. */
export interface InterestOption {
  /** Stable key returned in the selection set. */
  id: string;
  /** Chip label. */
  label: string;
  /** Optional leading emoji/glyph. */
  icon?: string;
}
