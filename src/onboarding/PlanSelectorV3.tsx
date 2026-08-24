import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { PlanSelectorProps } from './PlanSelector';

/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV3Props = PlanSelectorProps;

/**
 * PlanSelector, redesigned (v3): a **compact plan list**. A small billing toggle,
 * then each tier as one selectable row — a radio dot, the name (+ a badge chip),
 * and the price pinned right. Dense for a settings/checkout context. The opposite
 * of v2's stacked cards. Same props, token-only.
 */
export const PlanSelectorV3 = React.forwardRef<HTMLDivElement, PlanSelectorV3Props>(
  function PlanSelectorV3(
    { plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, className, ...rest },
    ref
  ) {
    if (plans.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">💳</span>} title="No plans available" className={className} {...rest} />;
    }
    const annual = billingPeriod === 'annual';

    return (
      <div ref={ref} className={cn('flex flex-col', className)} role="radiogroup" aria-label="Plans" {...rest}>
        {showBillingToggle ? (
          <div className="mb-1 flex items-center gap-2">
            <div className="inline-flex rounded-md border border-border p-0.5 text-xs">
              {(['monthly', 'annual'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={billingPeriod === p}
                  onClick={() => onBillingPeriodChange?.(p)}
                  className={cn('rounded px-2 py-0.5 font-semibold capitalize', billingPeriod === p ? 'bg-primary text-on-primary' : 'text-muted')}
                >
                  {p}
                </button>
              ))}
            </div>
            {annual && annualSavingsLabel ? <span className="text-xs font-semibold text-success">{annualSavingsLabel}</span> : null}
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
              className="flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors hover:bg-neutral-50"
            >
              <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-full border', selected ? 'border-primary' : 'border-border')}>
                {selected ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-on-surface">
                {plan.name}
                {plan.badge ? <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">{plan.badge}</span> : null}
              </span>
              <span className="text-sm font-bold text-on-surface">{annual ? plan.annualPrice : plan.monthlyPrice}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
