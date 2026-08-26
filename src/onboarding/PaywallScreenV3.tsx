import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { PlanSelectorV3 } from './PlanSelectorV3';
import { TrialBanner } from './TrialBanner';
import {
  PaywallFeatureRows,
  PaywallFooter,
  toFeatureRows,
  toValueFramingRows,
  type PaywallScreenProps,
} from './PaywallScreen';

/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV3Props = PaywallScreenProps;

/**
 * PaywallScreen, redesigned (v3): the **compact** line. No hero panel — a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the tiers stack as {@link PlanSelectorV3} rows. Sized for a modal or
 * bottom sheet rather than a full page; the CTA closes the sheet, which is the
 * fold here, so the ask still never scrolls away (§5).
 *
 * `showHero` is honoured as an opt-*in* on this line (it defaults to off).
 *
 * The plan rows are the v3 selector, not the base one — an app that picks v3
 * picks it for every surface it sees. {@link TrialBanner} has no alternate, so
 * the base one is the whole line. Same props, token-only.
 */
export const PaywallScreenV3 = React.forwardRef<HTMLDivElement, PaywallScreenV3Props>(
  function PaywallScreenV3(
    {
      title,
      subtitle,
      illustration,
      logoGlyph = '✦',
      showHero = false,
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
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-sm',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-4 p-5">
          {trial ? (
            <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
          ) : null}

          {/* Small leading tile + left-aligned headline — the compact stand-in
              for the hero panel (§11). `illustration` takes the tile. */}
          <div className="flex items-center gap-4">
            <span
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)]',
                showHero ? 'bg-primary-50' : 'bg-primary'
              )}
            >
              {illustration ?? (
                <Icon glyph={logoGlyph} size="lg" color={showHero ? 'primary' : 'onPrimary'} />
              )}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="text-xl font-bold leading-tight text-on-surface">{title}</h1>
              {subtitle ? (
                <Text size="sm" tone="muted">
                  {subtitle}
                </Text>
              ) : null}
            </span>
          </div>

          <PaywallFeatureRows rows={rows} heading={featuresTitle} rail={featureRail} dense />

          <PaywallFeatureRows rows={framingRows} heading={valueFraming?.title} dense />

          {plans && plans.length > 0 ? (
            <PlanSelectorV3
              plans={plans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={onSelectPlan}
              billingPeriod={billingPeriod}
              onBillingPeriodChange={onBillingPeriodChange}
              annualSavingsLabel={annualSavingsLabel}
            />
          ) : null}
        </div>

        {/* A sheet is short: the footer is its bottom edge, not a sticky bar. */}
        <PaywallFooter
          ctaLabel={ctaLabel}
          onSubscribe={onSubscribe}
          loading={loading}
          footnote={footnote}
          dismissLabel={dismissLabel}
          onDismiss={onDismiss}
          sticky={false}
        />
      </div>
    );
  }
);
