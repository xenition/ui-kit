import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG } from '../primitives/internal/tone-v4';
import { formatMoney } from '../commerce/money';
import { meterParts, spokenLine, TABULAR_CLASS } from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { BudgetBarProps } from './BudgetBar';

export interface BudgetBarV4Props extends BudgetBarProps {
  /** The word in front of an overspend. Default `'over'`. */
  overLabel?: string;
  /**
   * How the announced percentage is spelled. Default
   * `'<n>% of budget used'` — the base's own phrasing, now overridable and
   * carrying the **true** figure rather than the clamped one.
   */
  formatPercent?: (percent: number) => string;
}

/** The caption in front of a positive remainder. */
const REMAINING_LABEL = 'Remaining';

/**
 * **V4 budget bar** — the web twin of the native `BudgetBarV4`, same props as
 * {@link BudgetBar} plus `overLabel` and `formatPercent`.
 *
 * ## Four changes
 *
 * 1. **The bar and its name stop disagreeing.** The base clamped the drawn
 *    fill and left the announced percentage uncapped, so a category at 300%
 *    spent reported `aria-valuenow="100"` beside a name reading "300% of
 *    budget used". Both numbers are real and they are not the same number:
 *    `meterParts()` hands the clamped ratio to the meter, and the true percent
 *    goes to `aria-valuetext`, which is what a reader actually says.
 * 2. **The overspend has a sign and a word.** `signDisplay="never"` on the
 *    remainder meant −$40.00 and +$40.00 rendered the identical string, and
 *    the only difference between "you have $40 left" and "you are $40 over"
 *    was the hue — invisible in greyscale and to a red-green viewer.
 * 3. **The remainder is legible.** It was `text-muted` — a ramp step with no
 *    contrast promise — used as an ink, on the one figure in the component a
 *    user is looking for.
 * 4. **The size override applies.** The base passed `size="sm"` *and*
 *    `className="text-xs font-semibold"` to `MoneyAmount`; `cn()` is a plain
 *    joiner, so both landed on the element and Tailwind's emit order restored
 *    the originals — while the native twin's style object applied, and the two
 *    twins drew the same figure at different sizes. The size comes from the
 *    prop, and nothing is passed that cannot win.
 */
export const BudgetBarV4 = React.forwardRef<HTMLDivElement, BudgetBarV4Props>(function BudgetBarV4(
  {
    label,
    spentCents,
    limitCents,
    currency = 'USD',
    formatMoney: format = formatMoney,
    overLabel = 'over',
    formatPercent,
    className,
    ...rest
  },
  ref
) {
  const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
  const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;

  const { ratio, percent, over } = meterParts(spent, limit);
  const remaining = limit - spent; // positive = left, negative = over

  const spellPercent =
    formatPercent ??
    ((value: number) => `${new Intl.NumberFormat().format(value)}% of budget used`);
  const percentText = spellPercent(percent);

  const fill = over ? 'danger' : percent >= 75 ? 'warn' : 'success';

  return (
    <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
      <div className="flex items-baseline justify-between gap-sm">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">
          {label}
        </span>
        <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
          {`${format(spent, currency)} / ${format(limit, currency)}`}
        </span>
      </div>

      {/*
        `aria-valuenow` is the clamped ratio, because that is what the bar
        draws; `aria-valuetext` is the true percentage, because that is what
        the user needs to hear. The two are different numbers on purpose.
      */}
      <span
        role="progressbar"
        aria-label={spokenLine([label, percentText])}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuetext={percentText}
        className="block h-sm w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-selected"
      >
        <span
          aria-hidden="true"
          className={cn('block h-full rounded-[var(--xen-radius-full)]', TONE_BG[fill])}
          style={{ width: `${ratio * 100}%` }}
        />
      </span>

      <div className="flex items-center gap-xs">
        <span className="text-xs text-muted-text">
          {remaining >= 0 ? REMAINING_LABEL : overLabel}
        </span>
        <MoneyAmountV4
          cents={remaining}
          currency={currency}
          formatMoney={format}
          tone={remaining >= 0 ? 'muted' : 'expense'}
          size="sm"
        />
      </div>
    </div>
  );
});
