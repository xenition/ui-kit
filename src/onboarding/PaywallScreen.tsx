import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import type { BillingPeriod, PlanTier } from './types';

export interface PaywallValueProp {
  /** Leading glyph for the value row. */
  icon?: string;
  /** Outcome the user gets (design.md §47) — not a feature name. */
  text: string;
}

export interface PaywallScreenProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Value-first headline (e.g. `'Do your best work, faster'`). */
  title: string;
  /** Supporting line under the headline. */
  subtitle?: string;
  /** The "why upgrade" list, shown before any price (design.md §27). */
  valueProps?: PaywallValueProp[];
  /** Plans to choose from. When present, renders the inline {@link PlanSelector}. */
  plans?: PlanTier[];
  /** Selected tier id (controlled). */
  selectedPlanId?: string;
  /** Fires with the clicked tier id. */
  onSelectPlan?: (planId: string) => void;
  /** Billing cadence (controlled). Default `'annual'` — annual leads on paywalls. */
  billingPeriod?: BillingPeriod;
  /** Fires when the monthly/annual toggle changes. */
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  /** Savings pill copy beside the annual toggle. */
  annualSavingsLabel?: string;
  /** Optional trial strip above the value list. */
  trial?: { title: string; subtitle?: string; daysLeft?: number };
  /** Primary CTA copy. Default `'Start free trial'`. */
  ctaLabel?: string;
  /** Fires on the primary CTA. */
  onSubscribe?: () => void;
  /** Show a spinner on the CTA while purchase is in flight. */
  loading?: boolean;
  /** Fine print under the CTA (e.g. cancel-anytime, terms). */
  footnote?: string;
  /** Dismiss ("Maybe later") link copy. Hidden without `onDismiss`. */
  dismissLabel?: string;
  /** Fires on dismiss. */
  onDismiss?: () => void;
}

/**
 * Value-first paywall — leads with outcomes and the value list, then the plans,
 * then the price and CTA, so the ask lands only after the value is clear
 * (paywall-after-value, design.md §27-28). Composes {@link TrialBanner},
 * {@link PlanSelector} and the primary CTA, with an optional "Maybe later"
 * escape. The body scrolls while the CTA stays pinned. All colors token-bound.
 * No literal colors.
 */
export const PaywallScreen = React.forwardRef<HTMLDivElement, PaywallScreenProps>(
  function PaywallScreen(
    {
      title,
      subtitle,
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
    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
            {subtitle ? (
              <p className="text-base leading-relaxed text-muted">{subtitle}</p>
            ) : null}
          </div>

          {trial ? (
            <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
          ) : null}

          {valueProps.length ? (
            <div className="flex flex-col gap-2">
              {valueProps.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success">
                    <Icon glyph={v.icon ?? '✓'} size="sm" color="onSuccess" />
                  </div>
                  <span className="flex-1 text-base text-on-surface">{v.text}</span>
                </div>
              ))}
            </div>
          ) : null}

          {plans?.length ? (
            <PlanSelector
              plans={plans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={onSelectPlan}
              billingPeriod={billingPeriod}
              onBillingPeriodChange={onBillingPeriodChange}
              annualSavingsLabel={annualSavingsLabel}
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-border p-6">
          <GetStartedButton label={ctaLabel} loading={loading} onClick={onSubscribe} />
          {footnote ? (
            <p className="text-center text-xs text-muted">{footnote}</p>
          ) : null}
          {dismissLabel && onDismiss ? (
            <button
              type="button"
              aria-label={dismissLabel}
              onClick={onDismiss}
              className="py-1 text-center text-base font-medium text-muted"
            >
              {dismissLabel}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
