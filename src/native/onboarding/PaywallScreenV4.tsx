import * as React from 'react';
import { Animated } from 'react-native';
import { useXenitionTheme } from '../theme';
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
  flowGrounds,
  useFlowEntrance,
  type FlowLegalLink,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import { toFeatureRows, toValueFramingRows, type PaywallScreenProps } from './PaywallScreen';
import type { IconName } from '../../primitives/icon-names';

export interface PaywallScreenV4Props extends PaywallScreenProps, OnboardingFlowV4Props {
  /**
   * The reassurance line directly above the CTA — "No commitment · Cancel
   * anytime".
   *
   * The single highest-leverage line on a paywall and the module had no slot
   * for it. Every host was folding it into `footnote`, where it rendered at
   * `xs` in the muted tone under three lines of billing terms, which is the
   * opposite of what it is for.
   */
  reassurance?: string;
  /** Its glyph. Default `success` — monochrome, so it takes the tint. */
  reassuranceIcon?: IconName;
  /**
   * The declined choice, under the CTA, underlined — "No thanks, start my
   * 7-day free trial".
   *
   * The base had `dismissLabel`, which the footer drew as muted text and users
   * read as fine print. This is the same idea given the affordance it needs;
   * `dismissLabel` still works and still maps here.
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
  onLegalLinkPress?: (id: string) => void;
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
 * **V4 paywall** — the base's props plus the footer slots a shipping paywall
 * actually needs (`reassurance`, `secondaryLabel`, `restoreLabel`,
 * `legalLinks`), the header controls (`stepCount`, `onBack`) and the line's two
 * configuration axes (`ground`, `accent`).
 *
 * This is the screen the two reference screenshots are, and rebuilding it is
 * what surfaced most of this pass:
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
 *    row — the three things a store requires or a conversion depends on.
 * 2. **The body scrolls under a fixed header and footer.** The base scrolled
 *    the whole page including the header, so the progress bars left the screen
 *    as the user read the plan.
 * 3. **A single plan gets the offer layout by default.** One plan laid out as
 *    a two-up card grid is a grid with a hole in it.
 * 4. **The content arrives.** One staggered entrance, on the M3 scale,
 *    collapsed entirely under `useReducedMotion()`.
 * 5. **`dismissLabel` is promoted, not replaced.** It still works and still
 *    lands in the secondary slot, so no existing caller moves; `secondaryLabel`
 *    is the name that says what it is.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no features, no plans, no footer links.
 */
export function PaywallScreenV4({
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
  onLegalLinkPress,
  stepCount,
  stepIndex = 0,
  onBack,
  planLayout,
  ground = 'plain',
  accent = 'primary',
  style,
}: PaywallScreenV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);

  const rows = toFeatureRows(features, valueProps);
  const framingRows = toValueFramingRows(valueFraming);
  // One plan is an offer, not a choice (see `PlanSelectorV4`).
  const layout: PlanSelectorV4Layout = planLayout ?? (plans?.length === 1 ? 'offer' : 'cards');

  // `dismissLabel` predates `secondaryLabel` and meant the same thing. The new
  // name wins where both are given; neither is required. `onDismiss` keeps
  // both jobs it had — the header ✕ and, absent `onSecondary`, the declined
  // link — because in every flow that offers both they escape to the same
  // place, and giving them separate callbacks would invite them not to.
  const declined = secondaryLabel ?? dismissLabel;
  const onDeclined = onSecondary ?? onDismiss;

  const hero = useFlowEntrance(0);
  const heading = useFlowEntrance(1);
  const content = useFlowEntrance(2);

  return (
    <FlowScreenV4
      grounds={grounds}
      center={false}
      style={style}
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
          onLegalLinkPress={onLegalLinkPress}
        >
          <GetStartedButtonV4
            label={ctaLabel}
            onPress={onSubscribe}
            loading={loading}
            trailing={ctaTrailing}
          />
        </FlowFooterV4>
      }
    >
      <Animated.View style={[{ alignSelf: 'stretch' }, hero]}>
        <FlowHeroV4
          show={showHero}
          illustration={illustration}
          logoGlyph={logoGlyph}
          grounds={grounds}
        />
      </Animated.View>

      <Animated.View style={[{ alignSelf: 'stretch' }, heading]}>
        <FlowHeadlineV4 title={title} subtitle={subtitle} />
      </Animated.View>

      <Animated.View style={[{ alignSelf: 'stretch', gap: tokens.spacing.lg }, content]}>
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
      </Animated.View>
    </FlowScreenV4>
  );
}
