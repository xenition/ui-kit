import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Segmented } from '../primitives/Segmented';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import type { BillingPeriod, PlanTier } from './types';

/** Two-up cards (§7) or the original stacked list. */
export type PlanSelectorLayout = 'cards' | 'list';

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
  /**
   * `'cards'` is the reference paywall pair — two-up, equal width, the selected
   * one filled (§7). `'list'` is the older stacked rendering, still the right
   * shape for a settings screen. Default `'cards'`; the compact v3 line
   * defaults to `'list'` instead.
   */
  layout?: PlanSelectorLayout;
}

/**
 * The monthly/annual cadence toggle plus its savings pill — identical across
 * the three lines, so it lives in one place.
 */
export function BillingToggle({
  billingPeriod,
  onBillingPeriodChange,
  annualSavingsLabel,
  spread = false,
}: {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  annualSavingsLabel?: string;
  spread?: boolean;
}): React.ReactElement {
  return (
    <div className={cn('flex items-center gap-2', spread && 'justify-between')}>
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
  );
}

/**
 * One §7 plan card. Selected takes the `primary` fill plus the 2px ring;
 * unselected stays outlined. The "BEST"/"SAVE 20%" badge sits top-right of the
 * card it belongs to.
 */
export function PlanCard({
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
        'flex w-full flex-col gap-2 rounded-[var(--xen-radius-lg)] p-5 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected
          ? 'border-2 border-primary bg-primary'
          : plan.highlighted
            ? 'border border-accent bg-surface'
            : 'border border-border bg-surface'
      )}
    >
      {/* Name left, badge top-right of its own card. */}
      <span className="flex items-start justify-between gap-1">
        <Text size="base" weight="semibold" tone={fg} className="min-w-0">
          {plan.name}
        </Text>
        {plan.badge ? (
          // §7 asks for the badge "in colors.success on successText". The
          // compiled palette has no legible form of that pair on a card: on web
          // the soft-success badge is a NEUTRAL ground with success text, and
          // successText is tuned for `surface`, not for a primary fill. The
          // solid success/onSuccess pair is the one that reads as "success" on
          // both an outlined and a filled card, and it is identical on both
          // twins — so that is what both use.
          <Badge tone="success">{plan.badge}</Badge>
        ) : null}
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
            <span key={i} className="flex items-start gap-1">
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

/** The original stacked row — kept for `layout="list"`. */
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
        'flex flex-col gap-1 rounded-[var(--xen-radius-lg)] bg-surface p-5 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected
          ? 'border-2 border-primary'
          : plan.highlighted
            ? 'border-2 border-accent'
            : 'border border-border'
      )}
    >
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Text size="lg" weight="bold">
            {plan.name}
          </Text>
          {plan.badge ? <Badge tone="success">{plan.badge}</Badge> : null}
        </span>
        {selected ? <Icon name="check" size="base" color="primary" aria-label="Selected" /> : null}
      </span>

      <span className="flex items-baseline gap-1">
        <Text size="2xl" weight="bold">
          {price}
        </Text>
        {plan.priceCaption ? (
          <Text size="sm" tone="muted">
            {plan.priceCaption}
          </Text>
        ) : null}
      </span>

      {plan.features?.length ? (
        <span className="mt-1 flex flex-col gap-1">
          {plan.features.map((f, i) => (
            <span key={i} className="flex items-center gap-1">
              <Icon name="check" size="sm" color="success" />
              <Text size="sm" tone="muted">
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
 * Subscription tier picker — a `radiogroup` of plan cards plus an optional
 * monthly/annual {@link Segmented} toggle that swaps every card's price.
 *
 * The default is the reference pair (§7): two-up, equal width, `radius.lg`, the
 * selected card taking the `primary` fill and a 2px ring while the others stay
 * outlined, with a tier's "BEST"/"SAVE 20%" badge top-right of its own card. A
 * lone plan takes the full width rather than sitting in half a grid.
 * `layout="list"` restores the older stacked rows for dense contexts.
 *
 * Each card is a `radio` announcing its `checked` state; prices are
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
      layout = 'cards',
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

    const priceOf = (plan: PlanTier): string =>
      billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;

    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
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
              : // A lone plan takes the full width rather than half a grid.
                cn('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')
          )}
        >
          {plans.map((plan) =>
            layout === 'list' ? (
              <PlanRow
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onSelect={() => onSelectPlan?.(plan.id)}
              />
            ) : (
              <PlanCard
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
