import * as React from 'react';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import { formatMoney, type MoneyFormatter } from '../commerce/money';
import {
  moneyInkClass,
  pctText,
  PLACEHOLDER_CLASS,
  signParts,
  TABULAR_CLASS,
} from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { BalanceHeaderProps } from './BalanceHeader';

export interface BalanceHeaderV4Props extends BalanceHeaderProps {
  /** BCP-47 locale for the balance, the change and the percentage. */
  locale?: string;
  /** What the loading region announces. Default `'Loading balance'`. */
  loadingLabel?: string;
}

/**
 * **V4 balance header** — the web twin of the native `BalanceHeaderV4`, same
 * props as {@link BalanceHeader} plus `locale` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only `trend` fell to
 *    `up = (undefined ?? 0) >= 0`, and a balance collapsing across twelve
 *    points was drawn in `success`. The line now reads its own first and last
 *    values, and a flat series is neither.
 * 2. **A zero change is not a gain.** `>= 0` painted "+$0.00" green with an ▲
 *    beside it. `signParts()` gives zero its own neutral tone and no glyph.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so a `changePct` of
 *    `12.3456789` printed in full, and the decimal mark was hard-locked to `.`
 *    while the amount above it went through `Intl` and used the locale's.
 * 4. **Loading is announced and takes the shared placeholder.** The skeleton
 *    was `bg-border` — the *hairline* colour used as a surface — and nothing
 *    told a reader the figure was on its way.
 * 5. **The change is drawn in the contrast-corrected ink** (via
 *    {@link MoneyAmountV4}), where the base used `text-success` /
 *    `text-danger`, which are fills.
 */
export const BalanceHeaderV4 = React.forwardRef<HTMLDivElement, BalanceHeaderV4Props>(
  function BalanceHeaderV4(
    {
      label = 'Total balance',
      balanceCents,
      currency = 'USD',
      changeCents,
      changePct,
      trend,
      formatMoney: format,
      loading = false,
      locale,
      loadingLabel = 'Loading balance',
      className,
      ...rest
    },
    ref
  ) {
    const fmt: MoneyFormatter =
      format ?? ((cents: number, code?: string) => formatMoney(cents, code, locale));

    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const change = signParts(hasChange ? (changeCents as number) : 0);

    // The line's own numbers decide its tone. A flat series is `muted`: it is
    // neither a gain nor a loss, and calling it either is a lie the eye reads
    // before it reads the figure.
    const series = (trend ?? []).filter((point) => Number.isFinite(point));
    const first = series[0];
    const last = series[series.length - 1];
    const trendTone =
      series.length < 2 || first === undefined || last === undefined || last === first
        ? 'muted'
        : last > first
          ? 'success'
          : 'danger';

    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';

    return (
      <div
        ref={ref}
        role="group"
        className={cn('flex flex-col gap-xs', className)}
        {...rest}
      >
        <span className="text-sm text-muted-text">{label}</span>

        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-label={loadingLabel}
            // The shape the figure is about to be, in the shared placeholder
            // ground — not the hairline token stretched into a block.
            className={cn('h-xl w-[calc(var(--xen-space-2xl)*4)]', PLACEHOLDER_CLASS)}
          />
        ) : (
          <span className={cn('text-3xl font-bold text-on-surface', TABULAR_CLASS)}>
            {fmt(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
          </span>
        )}

        {hasChange && !loading ? (
          <span
            className={cn(
              'flex items-center gap-xs text-sm',
              // Zero keeps `on-surface`, exactly as the figure inside it does.
              change.direction === 'zero' ? 'text-on-surface' : moneyInkClass(change.tone)
            )}
          >
            {arrow !== '' ? (
              <span aria-hidden="true" className="text-xs">
                {arrow}
              </span>
            ) : null}
            <MoneyAmountV4
              cents={changeCents as number}
              currency={currency}
              formatMoney={fmt}
              size="sm"
              signDisplay="always"
            />
            {typeof changePct === 'number' && Number.isFinite(changePct) ? (
              <span className={cn('font-semibold', TABULAR_CLASS)}>
                {`(${pctText(changePct, locale)}%)`}
              </span>
            ) : null}
          </span>
        ) : null}

        {series.length > 0 && !loading ? (
          // Decorative: every figure the line encodes is already written out
          // above it, and "Sparkline, 12 points" is not one of them.
          <Sparkline aria-hidden="true" data={series} color={trendTone} className="mt-xs" />
        ) : null}
      </div>
    );
  }
);
