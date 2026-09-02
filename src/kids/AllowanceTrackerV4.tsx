import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { meterParts } from './family-v4';
import type { AllowanceTrackerProps } from './AllowanceTracker';
import {
  allowanceMoney,
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  meterAria,
  spokenLine,
  TRACK_CLASS,
} from './internal/tone-v4';

export interface AllowanceTrackerV4Props extends AllowanceTrackerProps {
  /** Render an amount. Default routes a 3-letter code through `commerce/money`. */
  formatMoney?: (amount: number, currency?: string) => string;
  /** BCP-47 locale for the default formatter. */
  locale?: string;
  /** The five hard-coded English strings, each replaceable. */
  labels?: {
    balance?: string;
    earned?: string;
    spent?: string;
    add?: string;
    spend?: string;
  };
}

/** Today's five strings, kept as the defaults. */
const DEFAULT_LABELS = {
  balance: 'Balance',
  earned: 'Earned',
  spent: 'Spent',
  add: 'Add',
  spend: 'Spend',
} as const;

/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Six changes
 *
 * 1. **`balance={-5}` no longer renders `$-5`.** Money was built by string
 *    concatenation — the symbol, then `toLocaleString` — so the sign landed on
 *    the wrong side of it and `5.5` printed as `$5.5` rather than `$5.50`. It
 *    goes through `commerce/money`'s `formatMoney` when the caller gives a real
 *    ISO code, and through a signed, two-decimal fallback when `currency` is
 *    still the base's `'$'` symbol prefix. A caller can replace the whole thing.
 * 2. **The savings meter is drawn from the clamped ratio it already
 *    computed.** The base worked out `goalPct`, used it *only as a truthiness
 *    gate*, and then handed the raw numbers to the bar — so a balance of −20
 *    against a $100 goal announced `aria-valuenow="-20"` against
 *    `aria-valuemin="0"`. `meterParts` clamps the drawing and keeps the
 *    reading, and `aria-valuetext` says the real amount in words.
 * 3. **A negative balance reads 0% on both twins.** The web V2/V3 lines
 *    dropped the lower clamp their native twins kept and printed "-20% saved".
 * 4. **A goal of nought is "no goal", not an empty bar.** `target={0}` drew a
 *    track under a real balance with nothing to measure it against.
 * 5. **Earned and spent stopped being drawn as good and bad news.** They were
 *    `text-success` and `text-danger` — a child buying something with their own
 *    money is not a system error, and money in is not a status. The `+` and `−`
 *    signs and the two words carry the split, which is what a colour-blind
 *    reader was relying on anyway; the ink is the card's own.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    and the card painted `surface` where a raised card wants `card`.
 */
export const AllowanceTrackerV4 = React.forwardRef<HTMLDivElement, AllowanceTrackerV4Props>(
  function AllowanceTrackerV4(
    {
      balance,
      currency = '$',
      earned,
      spent,
      goal,
      loading = false,
      emptyLabel = 'No allowance set up yet',
      onAdd,
      onWithdraw,
      formatMoney,
      locale,
      labels,
      className,
      ...rest
    },
    ref
  ) {
    const money =
      formatMoney ?? ((amount: number, code?: string) => allowanceMoney(amount, code ?? currency, locale));
    const word = { ...DEFAULT_LABELS, ...labels };

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-allowance-tracker=""
          role="status"
          aria-live="polite"
          aria-label={word.balance}
          className={cn('flex flex-col gap-sm', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className)}
        >
          <SkeletonV4 className="h-3 w-1/3" />
          <SkeletonV4 className="h-7 w-1/2" />
        </div>
      );
    }

    const savings = meterParts(balance, goal?.target);

    if (!savings.valid) {
      return (
        <EmptyStateV4
          {...rest}
          ref={ref}
          data-xen-allowance-tracker=""
          className={className}
          icon={<span className="text-3xl">🐷</span>}
          title="Allowance"
          description={emptyLabel}
        />
      );
    }

    const balanceText = money(savings.value, currency);
    const targetText = goal ? money(goal.target, currency) : undefined;

    return (
      <div
        {...rest}
        ref={ref}
        data-xen-allowance-tracker=""
        className={cn('flex flex-col gap-md', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className)}
      >
        <div className="flex flex-col gap-xs">
          <span className="text-xs text-muted-text">{word.balance}</span>
          <span className="text-3xl font-bold text-on-card">{balanceText}</span>
        </div>

        {typeof earned === 'number' || typeof spent === 'number' ? (
          <div className="flex flex-wrap gap-lg">
            {typeof earned === 'number' ? (
              <div className="flex flex-col gap-xs">
                <span className="text-xs text-muted-text">{word.earned}</span>
                {/* The sign is the encoding, not the colour. */}
                <span className="text-base font-semibold text-on-card">
                  {`+${money(Math.abs(earned), currency)}`}
                </span>
              </div>
            ) : null}
            {typeof spent === 'number' ? (
              <div className="flex flex-col gap-xs">
                <span className="text-xs text-muted-text">{word.spent}</span>
                <span className="text-base font-semibold text-on-card">
                  {`−${money(Math.abs(spent), currency)}`}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {goal ? (
          <div className="flex flex-col gap-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-sm">
              <span className="text-sm font-semibold text-on-card">{`🎯 ${goal.label}`}</span>
              <span className="text-xs text-muted-text">
                {savings.hasLimit ? `${balanceText} / ${targetText}` : balanceText}
              </span>
            </div>
            {savings.hasLimit ? (
              <div
                {...meterAria(
                  savings,
                  spokenLine([`${balanceText} of ${targetText}`, `${savings.percent}%`])
                )}
                aria-label={goal.label}
                className={cn('h-2 w-full overflow-hidden rounded-full', TRACK_CLASS)}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${savings.percent ?? 0}%` }}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {onAdd || onWithdraw ? (
          <div className="flex flex-wrap gap-sm">
            {onAdd ? (
              <ButtonV4 size="sm" variant="primary" className="flex-1" onClick={() => onAdd()}>
                {word.add}
              </ButtonV4>
            ) : null}
            {onWithdraw ? (
              <ButtonV4 size="sm" variant="outline" className="flex-1" onClick={() => onWithdraw()}>
                {word.spend}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
