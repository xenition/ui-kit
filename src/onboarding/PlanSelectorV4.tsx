import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import { TextV4 } from '../primitives/TextV4';
import { flowGroundVars, type OnboardingAccentV4 } from './internal/flow-v4';
import type { PlanSelectorProps } from './PlanSelector';
import type { BillingPeriod, PlanTier } from './types';

/**
 * `'offer'` is the reference paywall's single-plan card: one price, its struck
 * compare-at, a savings pill and a per-unit caption. `'cards'` and `'list'`
 * behave exactly as the base's do.
 */
export type PlanSelectorV4Layout = 'cards' | 'list' | 'offer';

export interface PlanSelectorV4Props extends Omit<PlanSelectorProps, 'layout'> {
  /** Default `'cards'`, as the base. `'offer'` is new. */
  layout?: PlanSelectorV4Layout;
  /** Which brand slot selection answers in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /** Copy for the empty state. Default `'No plans available.'`. */
  emptyMessage?: string;
}

/** The price a plan shows for the active cadence. */
function priceFor(plan: PlanTier, period: BillingPeriod): string {
  return period === 'annual' ? plan.annualPrice : plan.monthlyPrice;
}

/**
 * The undiscounted price for the active cadence — **only** when it is
 * genuinely different from the price being charged.
 *
 * A "was" price equal to the "now" price is a fabricated discount, and this is
 * the one place the component gets to refuse to draw one. It cannot compare
 * magnitudes, because both are already-formatted strings in the host's
 * currency and locale, so it compares them as the host wrote them: identical
 * strings are not a discount.
 */
function compareAtFor(plan: PlanTier, period: BillingPeriod): string | null {
  const was = period === 'annual' ? plan.compareAtAnnualPrice : plan.compareAtMonthlyPrice;
  if (!was) return null;
  return was === priceFor(plan, period) ? null : was;
}

/**
 * The step a struck "was" price takes. Whole class names, because Tailwind's
 * content scanner reads source text and cannot follow `text-${size}`.
 */
const COMPARE_SIZE = { xs: 'text-xs', sm: 'text-sm', base: 'text-base' } as const;

/** The struck "was" price — announced, never only drawn. */
function ComparePrice({
  was,
  size,
}: {
  was: string;
  size: keyof typeof COMPARE_SIZE;
}): React.ReactElement {
  return (
    <s
      // "$29.99 $23.99" read aloud as a pair tells a screen reader user nothing
      // about which is which. `<s>` is semantically "no longer accurate", which
      // is exactly what a compare-at price is.
      aria-label={`Was ${was}`}
      className={cn('text-muted-text [font-variant-numeric:tabular-nums]', COMPARE_SIZE[size])}
    >
      {was}
    </s>
  );
}

/** The monthly/annual toggle plus its savings pill. */
function BillingToggleV4({
  billingPeriod,
  onBillingPeriodChange,
  annualSavingsLabel,
}: {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  annualSavingsLabel?: string;
}): React.ReactElement {
  return (
    <div className="flex items-center gap-sm">
      <SegmentedV4
        options={[
          { label: 'Monthly', value: 'monthly' },
          { label: 'Annual', value: 'annual' },
        ]}
        value={billingPeriod}
        onChange={(v) => onBillingPeriodChange?.(v as BillingPeriod)}
      />
      {annualSavingsLabel && billingPeriod === 'annual' ? (
        <BadgeV4 tone="success" variant="soft">
          {annualSavingsLabel}
        </BadgeV4>
      ) : null}
    </div>
  );
}

/**
 * The `'offer'` card — the reference paywall's plan block, exactly.
 *
 * ```
 * ┌──────────────────────────────────────────────┐
 * │ Yearly plan  [20% OFF]              $̶2̶9̶.̶9̶9̶   │
 * │ $23.99 / year                   $0.07/day    │
 * └──────────────────────────────────────────────┘
 * ```
 *
 * The price is the largest thing on it, because the price is the decision.
 */
function OfferCard({
  plan,
  period,
  onSelect,
}: {
  plan: PlanTier;
  period: BillingPeriod;
  onSelect: () => void;
}): React.ReactElement {
  const price = priceFor(plan, period);
  const was = compareAtFor(plan, period);
  const caption = plan.priceCaption ?? (period === 'annual' ? '/ year' : '/ month');

  return (
    <button
      type="button"
      role="radio"
      aria-checked
      onClick={onSelect}
      data-xen-v4-chrome="on-surface"
      // The ground is `card`, not `surface`: on a dark page a shadow alone is
      // nearly invisible, and a card that paints the page colour leaves its
      // border doing all the work.
      className="flex w-full flex-col gap-sm rounded-[var(--xen-radius-lg)] border-2 border-[var(--flow-fill)] bg-card p-lg text-left shadow-[var(--xen-elevation-card)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-sm">
        <span className="flex min-w-0 items-center gap-sm">
          <TextV4 size="base" weight="bold" tone="onCard">
            {plan.name}
          </TextV4>
          {plan.savingsLabel ? (
            <BadgeV4 tone="success" variant="soft" size="sm">
              {plan.savingsLabel}
            </BadgeV4>
          ) : null}
        </span>
        {was ? <ComparePrice was={was} size="base" /> : null}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-sm">
        <span className="flex min-w-0 items-baseline gap-xs">
          <span className="font-heading text-3xl font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {price}
          </span>
          <TextV4 size="lg" weight="semibold" tone="mutedText">
            {caption}
          </TextV4>
        </span>
        {plan.perUnitPrice ? (
          <TextV4
            size="base"
            weight="semibold"
            tone="mutedText"
            className="[font-variant-numeric:tabular-nums]"
          >
            {plan.perUnitPrice}
          </TextV4>
        ) : null}
      </div>

      {plan.features && plan.features.length > 0 ? (
        <ul className="mt-xs flex flex-col gap-xs">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-sm">
              <IconV4 name="check" size="sm" className="text-success-text" />
              <TextV4 size="sm" tone="onCard">
                {feature}
              </TextV4>
            </li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}

/** One §7 plan card — two-up, selected filled, badge top-right, name never clipped. */
function PlanCardV4({
  plan,
  price,
  was,
  selected,
  onSelect,
}: {
  plan: PlanTier;
  price: string;
  was: string | null;
  selected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      data-xen-v4-chrome={selected ? 'filled-primary' : 'on-surface'}
      className={cn(
        'flex flex-1 flex-col gap-sm rounded-[var(--xen-radius-lg)] p-lg text-left',
        selected
          ? 'border-2 border-[var(--flow-fill)] bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'
          : 'border border-border bg-card text-on-card'
      )}
    >
      {/*
        Name left, badge top-right — and the row WRAPS. Two-up on a narrow
        viewport leaves little per card, and a badge that refuses to move takes
        its width out of the name. The name is the thing being chosen; the
        ornament takes its own line instead.
      */}
      <span className="flex flex-wrap items-start justify-between gap-xs">
        <span className="text-base font-semibold">{plan.name}</span>
        {plan.badge ? (
          <BadgeV4 tone={selected ? 'neutral' : 'success'} variant="soft" size="sm">
            {plan.badge}
          </BadgeV4>
        ) : null}
      </span>

      <span className="flex items-baseline gap-xs">
        <span className="font-heading text-2xl font-bold [font-variant-numeric:tabular-nums]">
          {price}
        </span>
        {was ? (
          <s aria-label={`Was ${was}`} className="text-sm opacity-70 [font-variant-numeric:tabular-nums]">
            {was}
          </s>
        ) : null}
      </span>

      {plan.priceCaption ? <span className="text-xs opacity-80">{plan.priceCaption}</span> : null}

      {plan.features && plan.features.length > 0 ? (
        <ul className="flex flex-col gap-xs text-sm">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}

/** The stacked list rendering — the right shape for a settings screen. */
function PlanRowV4({
  plan,
  price,
  was,
  selected,
  onSelect,
}: {
  plan: PlanTier;
  price: string;
  was: string | null;
  selected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      data-xen-v4-chrome="on-surface"
      className={cn(
        'flex items-center gap-md rounded-[var(--xen-radius-lg)] bg-card p-md text-left',
        selected ? 'border-2 border-[var(--flow-fill)]' : 'border border-border'
      )}
    >
      {/*
        The radio mark, drawn rather than named: the icon set has a ✓ but no
        empty circle, and a check that vanishes when unselected leaves the row
        with no affordance. Decoration beside a row that already announces its
        own state, so it is hidden rather than announced twice.
      */}
      <span
        aria-hidden
        className={cn(
          'flex h-lg w-lg shrink-0 items-center justify-center rounded-full',
          selected ? 'bg-[var(--flow-fill)] text-[var(--flow-on-fill)]' : 'border border-border'
        )}
      >
        {selected ? <IconV4 name="check" size="xs" /> : null}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-xs">
        <TextV4 size="base" weight="semibold" tone="onCard">
          {plan.name}
        </TextV4>
        {plan.priceCaption ? (
          <TextV4 size="sm" tone="mutedText">
            {plan.priceCaption}
          </TextV4>
        ) : null}
      </span>

      <span className="flex shrink-0 flex-col items-end">
        <span className="font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]">
          {price}
        </span>
        {was ? <ComparePrice was={was} size="xs" /> : null}
      </span>
    </button>
  );
}

/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;

/** Split `plans` into rows of `columns`, so every card keeps an equal width. */
function chunk(plans: PlanTier[], columns: number): PlanTier[][] {
  const rows: PlanTier[][] = [];
  for (let i = 0; i < plans.length; i += columns) rows.push(plans.slice(i, i + columns));
  return rows;
}

/**
 * **V4 plan selector** — the web twin of the native `PlanSelectorV4`, the
 * base's props with `layout` widened to add `'offer'`, plus `accent` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional). It renders the
 *    **selected** plan, or the first, and ignores the rest.
 * 2. **Cards sit on `card`, not `surface`.**
 * 3. **A fabricated discount is refused** (see {@link compareAtFor}).
 * 4. **Both prices are announced** (see {@link ComparePrice}).
 * 5. **Hover and press are the shared chrome state layers**, not per-card
 *    opacity.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
export const PlanSelectorV4 = React.forwardRef<HTMLDivElement, PlanSelectorV4Props>(
  function PlanSelectorV4(
    {
      plans,
      selectedPlanId,
      onSelectPlan,
      billingPeriod = 'monthly',
      onBillingPeriodChange,
      showBillingToggle = true,
      annualSavingsLabel,
      layout = 'cards',
      accent = 'primary',
      emptyMessage = 'No plans available.',
      className,
      style,
      ...rest
    },
    ref
  ) {
    const vars = { ...flowGroundVars('plain', accent), ...style };

    if (!plans || plans.length === 0) {
      return (
        <div
          ref={ref}
          style={vars}
          className={cn('flex justify-center p-lg', className)}
          {...rest}
        >
          <TextV4 size="base" tone="mutedText">
            {emptyMessage}
          </TextV4>
        </div>
      );
    }

    const offer = layout === 'offer';
    // An offer screen shows one offer. `selectedPlanId` picks it so a host can
    // still swap the deal without changing the array it passes.
    const featured: PlanTier =
      plans.find((plan) => plan.id === selectedPlanId) ?? (plans[0] as PlanTier);
    const columns = plans.length === 1 ? 1 : COLUMNS;

    return (
      <div
        ref={ref}
        style={vars}
        className={cn('flex w-full flex-col gap-md', className)}
        {...rest}
      >
        {/* An offer has one cadence by definition — a toggle there would invite
            the user to leave the deal they were just shown. */}
        {showBillingToggle && !offer ? (
          <BillingToggleV4
            billingPeriod={billingPeriod}
            onBillingPeriodChange={onBillingPeriodChange}
            annualSavingsLabel={annualSavingsLabel}
          />
        ) : null}

        <div role="radiogroup" aria-label="Choose a plan" className="flex flex-col gap-md">
          {offer ? (
            <OfferCard
              plan={featured}
              period={billingPeriod}
              onSelect={() => onSelectPlan?.(featured.id)}
            />
          ) : layout === 'list' ? (
            plans.map((plan) => (
              <PlanRowV4
                key={plan.id}
                plan={plan}
                price={priceFor(plan, billingPeriod)}
                was={compareAtFor(plan, billingPeriod)}
                selected={plan.id === selectedPlanId}
                onSelect={() => onSelectPlan?.(plan.id)}
              />
            ))
          ) : (
            chunk(plans, columns).map((row, i) => (
              <div key={i} className="flex items-stretch gap-md">
                {row.map((plan) => (
                  <PlanCardV4
                    key={plan.id}
                    plan={plan}
                    price={priceFor(plan, billingPeriod)}
                    was={compareAtFor(plan, billingPeriod)}
                    selected={plan.id === selectedPlanId}
                    onSelect={() => onSelectPlan?.(plan.id)}
                  />
                ))}
                {/* Keeps the last card the same width as the others. */}
                {row.length < columns ? <span className="flex-1" /> : null}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);
