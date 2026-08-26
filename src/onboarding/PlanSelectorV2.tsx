import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { BillingToggle, type PlanSelectorProps } from './PlanSelector';
import type { PlanTier } from './types';

/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV2Props = PlanSelectorProps;

/** One elevated §7 tier card in the side-by-side pair. */
function TierCard({
  plan,
  price,
  selected,
  onSelect,
}: {
  plan: PlanTier;
  price: string;
  selected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  const fg = selected ? 'onPrimary' : 'onSurface';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${plan.name}, ${price}`}
      onClick={onSelect}
      className={cn(
        'flex w-full flex-col gap-2 rounded-[var(--xen-radius-lg)] p-5 text-left transition-shadow',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected || plan.highlighted ? 'shadow-lg' : 'shadow-md hover:shadow-lg',
        selected
          ? 'border-2 border-primary bg-primary'
          : plan.highlighted
            ? 'border border-accent bg-surface'
            : 'border border-border bg-surface'
      )}
    >
      {/* Name left, badge top-right of its own card (§7). */}
      <span className="flex items-start justify-between gap-1">
        <Text size="base" weight="semibold" tone={fg} className="min-w-0">
          {plan.name}
        </Text>
        {plan.badge ? <Badge tone="success">{plan.badge}</Badge> : null}
      </span>

      <span className="flex flex-col gap-1">
        <Text size="2xl" weight="bold" tone={fg}>
          {price}
        </Text>
        {plan.priceCaption ? (
          <Text size="sm" tone={selected ? 'onPrimary' : 'muted'}>
            {plan.priceCaption}
          </Text>
        ) : null}
      </span>

      {plan.features?.length ? (
        <span className="flex flex-col gap-1">
          {plan.features.map((f, i) => (
            <span key={i} className="flex items-start gap-1.5">
              <Icon name="check" size="sm" color={selected ? 'onPrimary' : 'success'} />
              <Text size="sm" tone={selected ? 'onPrimary' : 'muted'}>
                {f}
              </Text>
            </span>
          ))}
        </span>
      ) : null}
    </button>
  );
}

/**
 * PlanSelector, redesigned (v2): the editorial line. The §7 card pair, lifted —
 * two-up and equal width like the base selector, but shadowed, with the selected
 * card taking the `primary` fill, the 2px ring and the stronger elevation. A
 * lone plan takes the full width rather than half a grid. `layout="list"` stacks
 * the same cards for a dense context. Same props, token-only.
 */
export const PlanSelectorV2 = React.forwardRef<HTMLDivElement, PlanSelectorV2Props>(
  function PlanSelectorV2(
    {
      plans,
      selectedPlanId,
      onSelectPlan,
      billingPeriod = 'monthly',
      onBillingPeriodChange,
      showBillingToggle = true,
      annualSavingsLabel,
      layout = 'cards',
      className,
      ...rest
    },
    ref
  ) {
    if (plans.length === 0) {
      return (
        <EmptyState
          ref={ref}
          icon={<Icon name="card" size="2xl" color="muted" />}
          title="No plans available"
          className={className}
          {...rest}
        />
      );
    }

    const priceOf = (plan: PlanTier): string =>
      billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;

    return (
      <div ref={ref} className={cn('flex flex-col gap-6', className)} {...rest}>
        {showBillingToggle ? (
          <BillingToggle
            billingPeriod={billingPeriod}
            onBillingPeriodChange={onBillingPeriodChange}
            annualSavingsLabel={annualSavingsLabel}
          />
        ) : null}

        <div
          role="radiogroup"
          aria-label="Choose a plan"
          className={cn(
            'gap-4',
            layout === 'list'
              ? 'flex flex-col'
              : cn('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')
          )}
        >
          {plans.map((plan) => (
            <TierCard
              key={plan.id}
              plan={plan}
              price={priceOf(plan)}
              selected={plan.id === selectedPlanId}
              onSelect={() => onSelectPlan?.(plan.id)}
            />
          ))}
        </div>
      </div>
    );
  }
);
