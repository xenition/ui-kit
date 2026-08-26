import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { PlanSelectorV2 } from './PlanSelectorV2';
import { TrialBanner } from './TrialBanner';
import {
  PaywallFeatureRows,
  PaywallFooter,
  toFeatureRows,
  toValueFramingRows,
  type PaywallScreenProps,
} from './PaywallScreen';

/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV2Props = PaywallScreenProps;

/**
 * PaywallScreen, redesigned (v2): the **editorial** line. The hero runs
 * full-bleed to the top edge with no inset panel, and the content sheet rises
 * over it with a rounded lip so the headline overlaps the artwork. Below sit the
 * trial strip, the §8 feature rows, the value-framing block and the v2 plan
 * cards, with the CTA pinned (§5).
 *
 * The plan cards are the v2 selector, not the base one — an app that picks v2
 * picks it for every surface it sees, and a composite that reaches back into v1
 * breaks that line. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props, token-only.
 */
export const PaywallScreenV2 = React.forwardRef<HTMLDivElement, PaywallScreenV2Props>(
  function PaywallScreenV2(
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
      onSubscribe,
      loading = false,
      footnote,
      dismissLabel,
      onDismiss,
      className,
      ...rest
    },
    ref
  ) {
    const rows = toFeatureRows(features, valueProps);
    const framingRows = toValueFramingRows(valueFraming);

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {showHero ? (
            <div className="flex h-[34vh] min-h-[10rem] w-full items-center justify-center overflow-hidden bg-primary-50">
              {illustration ?? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <Icon glyph={logoGlyph} size="2xl" color="onPrimary" />
                </span>
              )}
            </div>
          ) : null}

          {/* The sheet rises over the hero — its rounded lip is the overlap. */}
          <div
            className={cn(
              'flex flex-col gap-6 rounded-t-[var(--xen-radius-lg)] bg-surface px-6 pb-8 pt-8',
              showHero && '-mt-6'
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-center text-2xl font-bold leading-tight text-on-surface">{title}</h1>
              {subtitle ? (
                <Text size="base" tone="muted" align="center" className="max-w-prose">
                  {subtitle}
                </Text>
              ) : null}
            </div>

            {trial ? (
              <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
            ) : null}

            <PaywallFeatureRows rows={rows} heading={featuresTitle} rail={featureRail} />

            <PaywallFeatureRows rows={framingRows} heading={valueFraming?.title} />

            {plans && plans.length > 0 ? (
              <PlanSelectorV2
                plans={plans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={onSelectPlan}
                billingPeriod={billingPeriod}
                onBillingPeriodChange={onBillingPeriodChange}
                annualSavingsLabel={annualSavingsLabel}
              />
            ) : null}
          </div>
        </div>

        <PaywallFooter
          ctaLabel={ctaLabel}
          onSubscribe={onSubscribe}
          loading={loading}
          footnote={footnote}
          dismissLabel={dismissLabel}
          onDismiss={onDismiss}
        />
      </div>
    );
  }
);
