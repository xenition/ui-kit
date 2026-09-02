import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { formatMoney as defaultFormatMoney } from './internal/format';
import { premiumParts } from './coverage-v4';
import { SKELETON_CLASS, spokenLine, TABULAR_CLASS } from './internal/tone-v4';
import type { PremiumCadence } from './PolicyCard';
import type { PremiumSummaryProps } from './PremiumSummary';

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/** How many placeholder lines a loading breakdown draws. */
const SKELETON_ROWS = 3;

export interface PremiumSummaryV4Props extends PremiumSummaryProps {
  /** The word over the total. Default `'Total'`. */
  totalLabel?: string;
  /** Title when there are no lines. Default `'No premium breakdown'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link emptyLabel}. */
  emptyDescription?: string;
  /** The skeleton's accessible name. Default `'Loading premium'`. */
  loadingLabel?: string;
  /**
   * Word the disagreement between the printed total and the lines under it,
   * both in integer **cents**. Default
   * `'Total $99.00, lines add up to $120.00'`.
   */
  formatMismatch?: (total: number, derived: number) => string;
}

/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **`items={[]}` is a real empty state.** The base rendered a card
 *    containing nothing but "Total $0.00" over a rule — a confident, precise
 *    figure asserting that this policy costs nothing, produced by summing an
 *    empty array. A quote that has not loaded and a policy that is genuinely
 *    free were the same screen.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown", and
 *    then let `totalCents` win outright: three lines summing to $120.00
 *    printed above a $99.00 Total with nothing to indicate which number the
 *    holder would be charged. `premiumParts` reports the disagreement and the
 *    card surfaces both figures.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `text-success` — so a refunded fee, a cancelled rider and a prorated
 *    adjustment all rendered as good news in the colour this kit reserves for
 *    *status*. A credit is a direction, and the leading `−` already says it.
 * 4. **Loading draws the shape it is about to be.** The placeholder rows were
 *    `bg-border` — the hairline token used as a fill, so the skeleton was the
 *    colour of a divider — and they replaced the total row rather than
 *    standing in for it.
 * 5. **The total is announced once.** The base put an `aria-label` on the
 *    figure and then rendered the figure inside it, so the amount was read
 *    from the label and the visible text was dropped; the label and the text
 *    are now the same string, and every word is a prop.
 */
export const PremiumSummaryV4 = React.forwardRef<HTMLDivElement, PremiumSummaryV4Props>(
  function PremiumSummaryV4(
    {
      items,
      totalCents,
      cadence = 'monthly',
      currency = 'USD',
      formatMoney: format = defaultFormatMoney,
      loading = false,
      totalLabel = 'Total',
      emptyLabel = 'No premium breakdown',
      emptyDescription,
      loadingLabel = 'Loading premium',
      formatMismatch,
      className,
      ...rest
    },
    ref
  ) {
    const rows = Array.isArray(items) ? items : [];
    const cadenceText = CADENCE_LABEL[cadence] ?? CADENCE_LABEL.monthly;

    if (loading) {
      return (
        <CardV4 ref={ref} className={className} {...rest}>
          <div
            role="status"
            aria-live="polite"
            aria-label={loadingLabel}
            className="flex flex-col gap-sm"
          >
            {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <div key={index} className="flex items-center justify-between gap-md">
                <span className={cn(SKELETON_CLASS, 'h-4 w-1/2')} />
                <span className={cn(SKELETON_CLASS, 'h-4 w-1/5')} />
              </div>
            ))}
            <div className="flex items-center justify-between gap-md border-t border-border pt-md">
              <span className={cn(SKELETON_CLASS, 'h-5 w-1/4')} />
              <span className={cn(SKELETON_CLASS, 'h-6 w-1/3')} />
            </div>
          </div>
        </CardV4>
      );
    }

    if (rows.length === 0) {
      return (
        <CardV4 ref={ref} className={className} {...rest}>
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </CardV4>
      );
    }

    const parts = premiumParts(
      rows.map((item) => item.amountCents),
      totalCents
    );
    const totalText = format(parts.total, currency);

    return (
      <CardV4 ref={ref} className={className} {...rest}>
        <div className="flex flex-col gap-sm">
          {rows.map((item, index) => {
            const cents = Number.isFinite(item.amountCents) ? Math.trunc(item.amountCents) : 0;
            const credit = cents < 0;
            return (
              <div
                key={`${item.label}-${index}`}
                className="flex items-center justify-between gap-md"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-muted-text">
                  {item.label}
                </span>
                {/*
                  One ink for every line. The sign is the signal; `success` is
                  reserved for status, and a credited fee is not one.
                */}
                <span className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                  {credit ? '−' : ''}
                  {format(Math.abs(cents), currency)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-md flex items-baseline justify-between border-t border-border pt-md">
          <span className="flex flex-col gap-xs">
            <span className="text-base font-bold text-on-card">{totalLabel}</span>
            <span className="text-xs text-muted-text">{cadenceText}</span>
          </span>
          <span className={cn('text-2xl font-bold text-primary-text', TABULAR_CLASS)}>
            {totalText}
          </span>
        </div>

        {/*
          The card is about to print a total its own itemisation contradicts.
          Saying so is the only honest option: silently preferring either
          number picks a side the component is not entitled to pick.
        */}
        {!parts.reconciles ? (
          <p role="status" className="mt-sm text-xs font-semibold text-warn-text">
            {(
              formatMismatch ??
              ((total: number, derived: number) =>
                spokenLine([
                  `${totalLabel} ${format(total, currency)}`,
                  `lines add up to ${format(derived, currency)}`,
                ]))
            )(parts.total, parts.derived)}
          </p>
        ) : null}
      </CardV4>
    );
  }
);
