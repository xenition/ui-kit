import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import type { ChartColor } from '../charts/internal';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import {
  changeInkClass,
  changeParts,
  PLACEHOLDER_CLASS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/market-v4';
import { formatPct, formatPrice } from './internal/format';
import type { PriceTickerProps } from './PriceTicker';

export interface PriceTickerV4Props extends PriceTickerProps {
  /**
   * The words the 24h direction is announced with. Defaults `'up'`, `'down'`,
   * `'unchanged'` — the third of which the base did not have at all.
   */
  directionLabels?: { up?: string; down?: string; flat?: string };
}

/** A flat quote has no direction, so its sparkline takes the identity slot. */
const SPARK_COLOR: Record<'success' | 'danger' | 'neutral', ChartColor> = {
  success: 'success',
  danger: 'danger',
  neutral: 'primary',
};

/**
 * **V4 price ticker** — the web twin of the native `PriceTickerV4`, same props
 * as {@link PriceTicker} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The ticker announces its price.** `aria-label="BTC price"` sat on the
 *    interactive root and replaced the subtree, so the price and the change —
 *    the only two things on the row — were never read out.
 * 2. **A loss is no longer announced as a gain.** `` `${pct >= 0 ? 'up' :
 *    'down'} ${formatPct(Math.abs(pct))}` `` re-applied a sign after taking the
 *    absolute value, so a 2.4% drop read "down +2.40%", and a flat `0` was
 *    called "up" beside a `•` glyph. One `changeParts()` call now decides the
 *    word, the glyph and the tone together.
 * 3. **The change is inked, not filled.** `changeToneClass()` returns
 *    `text-success` / `text-danger` / `text-muted`, which are fills.
 * 4. **The skeleton is visible, and the row stops jumping.** It was
 *    `bg-neutral-100` — a light-oriented ramp step that paints a pale plate
 *    onto a dark page — in a bare `h-10` / `h-14` box that had nothing to do
 *    with the row's real metrics, so a list of tickers visibly shifted the
 *    moment the quotes landed. The placeholder is now the shared opaque mix,
 *    drawn inside the real row container, in a `role="status"` region rather
 *    than behind an `aria-label` on a `div` with no role.
 * 5. **A press is a state layer** on the shared row body, and the row is a
 *    real `<button>` rather than a `div` with `role="button"`, `tabIndex` and
 *    a hand-written Enter/Space handler.
 */
export const PriceTickerV4 = React.forwardRef<HTMLDivElement, PriceTickerV4Props>(
  function PriceTickerV4(
    {
      symbol,
      name,
      price,
      changePct = 0,
      currencySymbol = '$',
      priceDecimals = 2,
      spark,
      variant = 'compact',
      loading = false,
      onClick,
      directionLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    const detailed = variant === 'detailed';

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${symbol} price`}
          className={className}
          {...rest}
        >
          {/*
            Inside the real row container, not a bare fixed-height box: the
            base's `h-10` / `h-14` had nothing to do with the row's own
            metrics, so a list of tickers visibly jumped the moment the quotes
            landed.
          */}
          <div className={cn(ROW_V4_BASE_CLASS, rowHeightClass(detailed && name != null))}>
            <span className={ROW_V4_TEXT_CLASS}>
              <span className={cn('block h-md w-1/4', PLACEHOLDER_CLASS)} />
              {detailed && name != null ? (
                <span className={cn('block h-sm w-2/5', PLACEHOLDER_CLASS)} />
              ) : null}
            </span>
            <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
              <span className={cn('block h-md w-[5rem]', PLACEHOLDER_CLASS)} />
              <span className={cn('block h-sm w-[3rem]', PLACEHOLDER_CLASS)} />
            </span>
          </div>
        </div>
      );
    }

    const change = changeParts(changePct, directionLabels);
    const priceText = formatPrice(price, { symbol: currencySymbol, decimals: priceDecimals });
    const label = spokenLine([
      symbol,
      detailed ? name : undefined,
      priceText,
      `${change.word} ${formatPct(changePct)}`,
    ]);

    const rowClass = cn(
      ROW_V4_BASE_CLASS,
      rowHeightClass(detailed && name != null),
      'rounded-[var(--xen-radius-md)]'
    );

    const body = (
      <>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-bold text-on-card">{symbol}</span>
          {detailed && name != null ? (
            <span className="truncate text-xs text-muted-text">{name}</span>
          ) : null}
        </span>

        {detailed && spark != null && spark.length > 0 ? (
          // A trend rail is decoration beside a number that already says the
          // same thing; the reader gets the number.
          <span aria-hidden="true" className="flex shrink-0 items-center">
            <Sparkline data={spark} width={64} height={28} color={SPARK_COLOR[change.tone]} />
          </span>
        ) : null}

        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>{priceText}</span>
          <span
            aria-hidden={onClick ? true : undefined}
            className={cn('text-xs font-semibold', TABULAR_CLASS, changeInkClass(change.tone))}
          >
            <span aria-hidden="true">{change.glyph}</span>{' '}
            {onClick ? null : <span className="sr-only">{`${change.word} `}</span>}
            {formatPct(changePct)}
          </span>
        </span>
      </>
    );

    return (
      <div ref={ref} className={className} {...rest}>
        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-row=""
            data-interactive="true"
            data-xen-v4-state=""
            style={rowStateVars()}
            className={cn(
              rowClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div className={rowClass}>{body}</div>
        )}
      </div>
    );
  }
);
