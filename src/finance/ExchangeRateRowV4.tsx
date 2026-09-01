import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import {
  moneyInkClass,
  pctText,
  ratePrecision,
  signParts,
  spokenLine,
  TABULAR_CLASS,
} from './internal/ledger-v4';
import type { ExchangeRateRowProps } from './ExchangeRateRow';

export interface ExchangeRateRowV4Props extends ExchangeRateRowProps {
  /** BCP-47 locale for the rate and the change. */
  locale?: string;
}

/**
 * **V4 exchange-rate row** — the web twin of the native `ExchangeRateRowV4`,
 * same props as {@link ExchangeRateRow} plus `locale`.
 *
 * ## Five changes
 *
 * 1. **The rate goes through `Intl`.** `toFixed` hard-locks the decimal mark
 *    to `.` and never groups, so a de-DE app printed "1.234,56 EUR" from the
 *    amount components and "0.9184" from this one, in the same list.
 * 2. **A large `precision` no longer throws.** `Math.max(0, …)` clamped the
 *    bottom and left the top open, so any value above 100 raised a
 *    `RangeError` out of `toFixed` and took the screen with it.
 *    `ratePrecision()` clamps both ends.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted
 *    "▲ +0.00%" in `success`, which reads as a rise that did not happen.
 * 4. **Direction is a sign, not a hue.** The percentage carries `+` / `−`
 *    from `Intl`'s `signDisplay`, so it survives greyscale, and the arrow
 *    beside it is decoration.
 * 5. **It is a real `<button>` when it is interactive**, from the shared row
 *    family, with a press state layer and `ring-ring` — where the base used
 *    the module's `role="button"`-on-a-`div` helper, no press feedback and
 *    `ring-primary-300`, a ramp step that inverts under
 *    `[data-theme="dark"]`.
 */
export const ExchangeRateRowV4 = React.forwardRef<HTMLDivElement, ExchangeRateRowV4Props>(
  function ExchangeRateRowV4(
    {
      baseCurrency,
      quoteCurrency,
      rate,
      changePct,
      precision = 4,
      locale,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const digits = ratePrecision(precision);
    const rateText = new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(Number.isFinite(rate) ? rate : 0);

    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const change = signParts(hasChange ? (changePct as number) : 0);
    const changeText = hasChange ? `${pctText(changePct as number, locale)}%` : undefined;
    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';

    const name = spokenLine([`${baseCurrency} to ${quoteCurrency}`, rateText, changeText]);

    const body = (
      <>
        <span className="min-w-0 flex-1 truncate text-base font-semibold text-on-surface">
          {baseCurrency} <span className="text-muted-text">→</span> {quoteCurrency}
        </span>
        <span className={cn('shrink-0 text-base font-bold text-on-surface', TABULAR_CLASS)}>
          {rateText}
        </span>
        {changeText != null ? (
          <span
            className={cn(
              'shrink-0 text-xs font-semibold',
              change.direction === 'zero' ? 'text-muted-text' : moneyInkClass(change.tone),
              TABULAR_CLASS
            )}
          >
            {arrow !== '' ? (
              <span aria-hidden="true" className="mr-xs">
                {arrow}
              </span>
            ) : null}
            {changeText}
          </span>
        ) : null}
      </>
    );

    return (
      <div ref={ref} className={cn('flex w-full', className)} {...rest}>
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={onClick}
            data-xen-v4-row=""
            data-interactive="true"
            data-xen-v4-state=""
            style={rowStateVars('var(--xen-surface)', 'var(--xen-on-surface)')}
            className={cn(
              ROW_V4_BASE_CLASS,
              rowHeightClass(false),
              'rounded-[var(--xen-radius-md)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div data-xen-v4-row="" className={cn(ROW_V4_BASE_CLASS, rowHeightClass(false))}>
            {body}
          </div>
        )}
      </div>
    );
  }
);
