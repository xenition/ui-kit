import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { BillingToggle, PlanCard, type PlanSelectorProps } from './PlanSelector';
import type { PlanTier } from './types';

/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV3Props = PlanSelectorProps;

/** One dense comparison row. */
function PlanRow({
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
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${plan.name}, ${price}`}
      onClick={onSelect}
      className={cn(
        'flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] px-4 py-2 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected ? 'border-2 border-primary bg-primary/10' : 'border border-border bg-surface'
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
          selected ? 'border-primary bg-primary' : 'border-border bg-surface'
        )}
      >
        {selected ? <Icon name="check" size="xs" color="onPrimary" /> : null}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <Text size="base" weight="semibold">
            {plan.name}
          </Text>
          {plan.badge ? (
            <Badge tone="success" size="sm">
              {plan.badge}
            </Badge>
          ) : null}
        </span>
        {plan.features?.length ? (
          <Text size="sm" tone="muted" numberOfLines={1}>
            {plan.features.join(' · ')}
          </Text>
        ) : null}
      </span>

      <span className="flex flex-col items-end">
        <Text size="lg" weight="bold">
          {price}
        </Text>
        {plan.priceCaption ? (
          <Text size="xs" tone="muted">
            {plan.priceCaption}
          </Text>
        ) : null}
      </span>
    </button>
  );
}

/**
 * PlanSelector, redesigned (v3): the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the v3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair instead. Same props, token-only.
 */
export const PlanSelectorV3 = React.forwardRef<HTMLDivElement, PlanSelectorV3Props>(
  function PlanSelectorV3(
    {
      plans,
      selectedPlanId,
      onSelectPlan,
      billingPeriod = 'monthly',
      onBillingPeriodChange,
      showBillingToggle = true,
      annualSavingsLabel,
      layout = 'list',
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
      <div ref={ref} className={cn('flex flex-col gap-3', className)} {...rest}>
        {showBillingToggle ? (
          <BillingToggle
            billingPeriod={billingPeriod}
            onBillingPeriodChange={onBillingPeriodChange}
            annualSavingsLabel={annualSavingsLabel}
            spread
          />
        ) : null}

        <div
          role="radiogroup"
          aria-label="Choose a plan"
          className={cn(
            'gap-2',
            layout === 'cards'
              ? cn('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')
              : 'flex flex-col'
          )}
        >
          {plans.map((plan) =>
            layout === 'cards' ? (
              <PlanCard
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onSelect={() => onSelectPlan?.(plan.id)}
              />
            ) : (
              <PlanRow
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onSelect={() => onSelectPlan?.(plan.id)}
              />
            )
          )}
        </div>
      </div>
    );
  }
);
