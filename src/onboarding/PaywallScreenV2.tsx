import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import type { PaywallScreenProps } from './PaywallScreen';

/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV2Props = PaywallScreenProps;

/**
 * PaywallScreen, redesigned (v2): a **hero paywall**. A primary-tinted hero band
 * carries the value-first headline + subtitle; below sit the trial banner, the
 * "why upgrade" list, the inline {@link PlanSelector}, a full-width CTA, footnote,
 * and a quiet dismiss. Bolder framing than v1, same paywall-after-value order.
 * Same props, token-only.
 */
export const PaywallScreenV2 = React.forwardRef<HTMLDivElement, PaywallScreenV2Props>(
  function PaywallScreenV2(
    { title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest },
    ref
  ) {
    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        <div className="rounded-b-3xl bg-primary/10 px-6 pb-8 pt-12 text-center">
          <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
          {subtitle ? <p className="mt-1 text-base text-muted">{subtitle}</p> : null}
        </div>
        <div className="flex flex-col gap-4 p-6">
          {trial ? <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} /> : null}
          {valueProps.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {valueProps.map((vp, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-on-surface">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon glyph={vp.icon ?? '✓'} size="sm" color="primary" />
                  </span>
                  {vp.text}
                </li>
              ))}
            </ul>
          ) : null}
          {plans && plans.length > 0 ? (
            <PlanSelector
              plans={plans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={onSelectPlan}
              billingPeriod={billingPeriod}
              onBillingPeriodChange={onBillingPeriodChange}
              annualSavingsLabel={annualSavingsLabel}
            />
          ) : null}
          <GetStartedButton label={ctaLabel} onClick={onSubscribe} loading={loading} />
          {footnote ? <p className="text-center text-xs text-muted">{footnote}</p> : null}
          {dismissLabel && onDismiss ? (
            <button type="button" onClick={onDismiss} className="py-1 text-center text-sm font-semibold text-muted">
              {dismissLabel}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
