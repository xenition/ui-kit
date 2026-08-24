import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';
import { PlanSelector } from './PlanSelector';
import type { PaywallScreenProps } from './PaywallScreen';

/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV3Props = PaywallScreenProps;

/**
 * PaywallScreen, redesigned (v3): a **compact upgrade sheet**. A tight title +
 * subtitle, a condensed inline value list, the {@link PlanSelector}, and the CTA
 * + dismiss — sized for a modal/bottom sheet rather than a full page. The
 * opposite of v2's hero paywall. Same props, token-only.
 */
export const PaywallScreenV3 = React.forwardRef<HTMLDivElement, PaywallScreenV3Props>(
  function PaywallScreenV3(
    { title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest },
    ref
  ) {
    void trial;
    return (
      <div ref={ref} className={cn('flex flex-col gap-3 rounded-lg bg-surface p-5 shadow-sm', className)} {...rest}>
        <div>
          <h1 className="text-lg font-bold text-on-surface">{title}</h1>
          {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
        </div>
        {valueProps.length > 0 ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {valueProps.map((vp, i) => (
              <li key={i} className="flex items-center gap-1 text-xs text-on-surface">
                <Icon glyph={vp.icon ?? '✓'} size="xs" color="primary" /> {vp.text}
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
          <button type="button" onClick={onDismiss} className="text-center text-sm font-semibold text-muted">
            {dismissLabel}
          </button>
        ) : null}
      </div>
    );
  }
);
