/**
 * Shared data shapes for the `@xenition/ui/native/onboarding` module. These are
 * plain, presentational contracts — the app owns the data and passes it in;
 * nothing here fetches or persists. Copy is caller-supplied so hosts stay in
 * control of localization and outcome-oriented wording (design.md §47).
 */

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
