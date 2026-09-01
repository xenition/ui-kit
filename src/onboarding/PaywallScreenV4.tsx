import * as React from 'react';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { PaywallFeatureRowsV4 } from './PaywallFeatureRowsV4';
import { PlanSelectorV4, type PlanSelectorV4Layout } from './PlanSelectorV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import { TrialBannerV4 } from './TrialBannerV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowRegion,
  type FlowLegalLink,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import { toFeatureRows, toValueFramingRows, type PaywallScreenProps } from './PaywallScreen';
import type { IconName } from '../primitives/icon-names';

export interface PaywallScreenV4Props extends PaywallScreenProps, OnboardingFlowV4Props {
  /**
   * The reassurance line directly above the CTA — "No commitment · Cancel
   * anytime".
   *
   * The single highest-leverage line on a paywall and the module had no slot
   * for it. Every host was folding it into `footnote`, where it rendered at
   * `xs` in the muted tone under three lines of billing terms — the opposite
   * of what it is for.
   */
  reassurance?: string;
  /** Its glyph. Default `success` — monochrome, so it takes the tint. */
  reassuranceIcon?: IconName;
  /**
   * The declined choice, under the CTA, underlined — "No thanks, start my
   * 7-day free trial". `dismissLabel` still works and still maps here.
   */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /**
   * "Restore Purchases" — required by both stores on any screen that sells a
   * subscription, and previously the caller's problem.
   */
  restoreLabel?: string;
  onRestore?: () => void;
  /** Terms · Privacy, inline under everything else. */
  legalLinks?: FlowLegalLink[];
  onLegalLinkClick?: (id: string) => void;
  /** Header step indicator — total steps in the surrounding flow. */
  stepCount?: number;
  /** Zero-based position within {@link stepCount}. Default `0`. */
  stepIndex?: number;
  /** Back affordance in the header. */
  onBack?: () => void;
  /** How the plans are laid out. Default `'offer'` when exactly one plan is passed. */
  planLayout?: PlanSelectorV4Layout;
  /** Trailing mark on the CTA. Overrides the default `→`. */
  ctaTrailing?: React.ReactNode;
}

/**
 * **V4 paywall** — the web twin of the native `PaywallScreenV4`: the base's
 * props plus the footer slots a shipping paywall actually needs
 * (`reassurance`, `secondaryLabel`, `restoreLabel`, `legalLinks`), the header
 * controls (`stepCount`, `onBack`) and the line's two configuration axes.
 *
 * This is the screen the two reference screenshots are:
 *
 * ```
 *  ‹   ▬▬▬ ▬▬▬ ▬▬▬                              ✕     header
 *  ┌───────────────────────────────────────────┐
 *  │              hero artwork                 │      body (scrolls)
 *  └───────────────────────────────────────────┘
 *              You're all set to save
 *      Start hunting the best prices — your …
 *  ┌───────────────────────────────────────────┐
 *  │ Yearly plan [20% OFF]             $̶2̶9̶.̶9̶9̶  │      PlanSelectorV4 'offer'
 *  │ $23.99 / year                  $0.07/day  │
 *  └───────────────────────────────────────────┘
 *      Payment is charged to your store …            footnote
 *  ───────────────────────────────────────────────    hairline
 *      ✓ No commitment · Cancel anytime               reassurance
 *  ▓▓▓▓▓ Claim 20% off Yearly            ✨ ▓▓▓▓▓     CTA
 *      No thanks, start my 7-day free trial           secondary
 *              Restore Purchases                      restore
 *              Terms  ·  Privacy                      legal
 * ```
 *
 * ## Five changes
 *
 * 1. **The footer is the whole bottom of the screen, and it is pinned.** The
 *    base drew a CTA and a footnote in a band with no safe-area inset, and had
 *    nowhere at all for the reassurance line, the restore link or the legal
 *    row — one of those is a store requirement and one is most of the
 *    conversion.
 * 2. **The body scrolls under a fixed header and footer**, so the progress
 *    bars no longer leave the screen as the user reads the plan.
 * 3. **A single plan gets the offer layout by default.** One plan laid out as
 *    a two-up card grid is a grid with a hole in it.
 * 4. **The content arrives**, staggered, and not at all under
 *    `prefers-reduced-motion`.
 * 5. **`dismissLabel` is promoted, not replaced**, so no existing caller moves.
 *
 * Every part is optional and the screen composes without any of them.
 */
export const PaywallScreenV4 = React.forwardRef<HTMLDivElement, PaywallScreenV4Props>(
  function PaywallScreenV4(
    {
      title,
      subtitle,
      illustration,
      logoGlyph = '✦',
      showHero = true,
      features,
      featuresTitle,
      featureRail,
      valueFraming,
      valueProps = [],
      plans,
      selectedPlanId,
      onSelectPlan,
      billingPeriod = 'annual',
      onBillingPeriodChange,
      annualSavingsLabel,
      trial,
      ctaLabel = 'Start free trial',
      ctaTrailing,
      onSubscribe,
      loading = false,
      footnote,
      dismissLabel,
      onDismiss,
      reassurance,
      reassuranceIcon,
      secondaryLabel,
      onSecondary,
      restoreLabel,
      onRestore,
      legalLinks,
      onLegalLinkClick,
      stepCount,
      stepIndex = 0,
      onBack,
      planLayout,
      ground = 'plain',
      accent = 'primary',
      className,
      ...rest
    },
    ref
  ) {
    const rows = toFeatureRows(features, valueProps);
    const framingRows = toValueFramingRows(valueFraming);
    // One plan is an offer, not a choice (see `PlanSelectorV4`).
    const layout: PlanSelectorV4Layout = planLayout ?? (plans?.length === 1 ? 'offer' : 'cards');

    // `dismissLabel` predates `secondaryLabel` and meant the same thing. The
    // new name wins where both are given. `onDismiss` keeps both jobs it had —
    // the header ✕ and, absent `onSecondary`, the declined link — because in
    // every flow that offers both they escape to the same place.
    const declined = secondaryLabel ?? dismissLabel;
    const onDeclined = onSecondary ?? onDismiss;

    return (
        <FlowScreenV4
          ref={ref}
          {...rest}
          ground={ground}
          accent={accent}
          center={false}
          className={className}
          header={
            <FlowHeaderV4
              onBack={onBack}
              onDismiss={onDismiss}
              progress={
                stepCount != null && stepCount > 0 ? (
                  <ProgressDotsV4
                    variant="bars"
                    accent={accent}
                    count={stepCount}
                    activeIndex={stepIndex}
                  />
                ) : null
              }
            />
          }
          footer={
            <FlowFooterV4
              footnote={footnote}
              reassurance={reassurance}
              reassuranceIcon={reassuranceIcon}
              secondaryLabel={declined}
              onSecondary={onDeclined}
              tertiaryLabel={restoreLabel}
              onTertiary={onRestore}
              legalLinks={legalLinks}
              onLegalLinkClick={onLegalLinkClick}
            >
              <GetStartedButtonV4
                label={ctaLabel}
                onClick={onSubscribe}
                loading={loading}
                trailing={ctaTrailing}
              />
            </FlowFooterV4>
          }
        >
          <div className="w-full" {...flowRegion(0)}>
            <FlowHeroV4 show={showHero} illustration={illustration} logoGlyph={logoGlyph} />
          </div>

          <div className="w-full" {...flowRegion(1)}>
            <FlowHeadlineV4 title={title} subtitle={subtitle} />
          </div>

          <div className="flex w-full flex-col gap-lg" {...flowRegion(2)}>
            {trial ? (
              <TrialBannerV4
                title={trial.title}
                subtitle={trial.subtitle}
                daysLeft={trial.daysLeft}
              />
            ) : null}

            <PaywallFeatureRowsV4
              rows={rows}
              heading={featuresTitle}
              rail={featureRail}
              accent={accent}
            />

            <PaywallFeatureRowsV4
              rows={framingRows}
              heading={valueFraming?.title}
              accent={accent}
            />

            {plans?.length ? (
              <PlanSelectorV4
                plans={plans}
                layout={layout}
                accent={accent}
                selectedPlanId={selectedPlanId}
                onSelectPlan={onSelectPlan}
                billingPeriod={billingPeriod}
                onBillingPeriodChange={onBillingPeriodChange}
                annualSavingsLabel={annualSavingsLabel}
              />
            ) : null}
          </div>
        </FlowScreenV4>
    );
  }
);
