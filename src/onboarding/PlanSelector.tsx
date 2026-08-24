import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Segmented } from '../primitives/Segmented';
import { EmptyState } from '../commerce';
import type { BillingPeriod, PlanTier } from './types';

export interface PlanSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tiers to choose from. Empty renders the empty state. */
  plans: PlanTier[];
  /** Currently selected tier id (controlled). */
  selectedPlanId?: string;
  /** Fires with the clicked tier id. */
  onSelectPlan?: (planId: string) => void;
  /** Active billing cadence (controlled). Default `'monthly'`. */
  billingPeriod?: BillingPeriod;
  /** Fires when the monthly/annual toggle changes. */
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  /** Show the monthly/annual toggle. Default `true`. */
  showBillingToggle?: boolean;
  /** Savings pill copy shown beside the annual toggle (e.g. `'Save 20%'`). */
  annualSavingsLabel?: string;
}

/**
 * Subscription tier picker — a `radiogroup` of clickable plan cards plus an
 * optional monthly/annual {@link Segmented} toggle that swaps every card's
 * price. The selected card lifts to the primary border and shows a check; each
 * card is a `radio` announcing its `checked` state to screen readers. Prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list with the {@link EmptyState}. No literal colors.
 */
export const PlanSelector = React.forwardRef<HTMLDivElement, PlanSelectorProps>(
  function PlanSelector(
    {
      plans,
      selectedPlanId,
      onSelectPlan,
      billingPeriod = 'monthly',
      onBillingPeriodChange,
      showBillingToggle = true,
      annualSavingsLabel,
      className,
      ...rest
    },
    ref
  ) {
    if (plans.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyState title="No plans available." />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
        {showBillingToggle ? (
          <div className="flex items-center gap-2">
            <Segmented
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual', value: 'annual' },
              ]}
              value={billingPeriod}
              onChange={(v) => onBillingPeriodChange?.(v as BillingPeriod)}
            />
            {annualSavingsLabel && billingPeriod === 'annual' ? (
              <Badge tone="success">{annualSavingsLabel}</Badge>
            ) : null}
          </div>
        ) : null}

        <div role="radiogroup" aria-label="Choose a plan" className="flex flex-col gap-2">
          {plans.map((plan) => {
            const selected = plan.id === selectedPlanId;
            const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <button
                key={plan.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${plan.name}, ${price}`}
                onClick={() => onSelectPlan?.(plan.id)}
                className={cn(
                  'flex flex-col gap-1 rounded-[var(--xen-radius-lg)] bg-surface p-5 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  selected
                    ? 'border-2 border-primary'
                    : plan.highlighted
                      ? 'border-2 border-accent'
                      : 'border border-border'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-on-surface">{plan.name}</span>
                    {plan.badge ? <Badge tone="primary">{plan.badge}</Badge> : null}
                  </div>
                  {selected ? (
                    <Icon glyph="✓" size="base" color="primary" aria-label="Selected" />
                  ) : null}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-on-surface">{price}</span>
                  {plan.priceCaption ? (
                    <span className="text-sm text-muted">{plan.priceCaption}</span>
                  ) : null}
                </div>

                {plan.features?.length ? (
                  <div className="mt-1 flex flex-col gap-1">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Icon glyph="✓" size="sm" color="success" />
                        <span className="text-sm text-muted">{f}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
