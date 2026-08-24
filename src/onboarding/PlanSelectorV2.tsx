import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import type { PlanSelectorProps } from './PlanSelector';

/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV2Props = PlanSelectorProps;

/**
 * PlanSelector, redesigned (v2): a **stacked plan-card picker**. A pill billing
 * toggle leads; each tier is a full bordered card — name + badge ribbon, a large
 * price with caption, and a checked feature list — and the selected card fills
 * with a primary ring + tint. Bolder than v1's compact list. Same props,
 * token-only.
 */
export const PlanSelectorV2 = React.forwardRef<HTMLDivElement, PlanSelectorV2Props>(
  function PlanSelectorV2(
    { plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, className, ...rest },
    ref
  ) {
    if (plans.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">💳</span>} title="No plans available" className={className} {...rest} />;
    }
    const annual = billingPeriod === 'annual';

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)} role="radiogroup" aria-label="Plans" {...rest}>
        {showBillingToggle ? (
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full border border-border p-0.5">
              {(['monthly', 'annual'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={billingPeriod === p}
                  onClick={() => onBillingPeriodChange?.(p)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors',
                    billingPeriod === p ? 'bg-primary text-on-primary' : 'text-muted'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            {annual && annualSavingsLabel ? <Badge tone="success">{annualSavingsLabel}</Badge> : null}
          </div>
        ) : null}

        {plans.map((plan) => {
          const selected = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelectPlan?.(plan.id)}
              className={cn(
                'flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-colors',
                selected ? 'border-primary bg-primary/10' : plan.highlighted ? 'border-primary/40 bg-surface' : 'border-border bg-surface hover:bg-neutral-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-on-surface">{plan.name}</span>
                {plan.badge ? <Badge tone="primary">{plan.badge}</Badge> : null}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-on-surface">{annual ? plan.annualPrice : plan.monthlyPrice}</span>
                {plan.priceCaption ? <span className="text-xs text-muted">{plan.priceCaption}</span> : null}
              </div>
              {plan.features && plan.features.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-sm text-on-surface">
                      <Icon glyph="✓" size="sm" color="success" /> {f}
                    </li>
                  ))}
                </ul>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }
);
