import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import type { IconColor } from '../primitives/Icon';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatMoney } from '../commerce/money';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { changeInkClass, changeParts, spokenLine, TABULAR_CLASS } from './internal/market-v4';
import { formatPct, formatToken } from './internal/format';
import type { TokenRowProps } from './TokenRow';

export interface TokenRowV4Props extends TokenRowProps {
  /**
   * The words the 24h direction is announced with. Defaults `'up'`, `'down'`,
   * `'unchanged'` — the third of which the base did not have at all.
   */
  directionLabels?: { up?: string; down?: string; flat?: string };
}

/**
 * The disc's ground and the ink drawn on it, as a **pair**.
 *
 * The base drew `Icon color={iconColor}` on a fixed `bg-neutral-100` disc, so
 * the default `primary` was a fill token inking text and an `onPrimary` glyph
 * — a slot whose only contrast promise is against `primary` — landed on a
 * neutral plate. An `on*` slot brings the fill it is paired with; a fill slot
 * keeps the neutral disc and inks with the contrast-corrected `*Text` form.
 */
const DISC: Record<IconColor, { ground: string; ink: string }> = {
  onSurface: { ground: 'bg-surface', ink: 'text-on-surface' },
  onPrimary: { ground: 'bg-primary', ink: 'text-on-primary' },
  onSuccess: { ground: 'bg-success', ink: 'text-on-success' },
  onWarn: { ground: 'bg-warn', ink: 'text-on-warn' },
  onDanger: { ground: 'bg-danger', ink: 'text-on-danger' },
  primary: { ground: 'bg-card border border-border', ink: 'text-primary-text' },
  muted: { ground: 'bg-card border border-border', ink: 'text-muted-text' },
  success: { ground: 'bg-card border border-border', ink: 'text-success-text' },
  warn: { ground: 'bg-card border border-border', ink: 'text-warn-text' },
  danger: { ground: 'bg-card border border-border', ink: 'text-danger-text' },
};

/**
 * **V4 token row** — the web twin of the native `TokenRowV4`, same props as
 * {@link TokenRow} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The row announces its numbers.** `aria-label="ETH holding"` sat on the
 *    interactive root, and an accessible name *replaces* the subtree — so the
 *    quantity, the fiat value and the 24h change, which are the entire reason
 *    the row exists, were never spoken. One name now carries all of them.
 * 2. **A loss is no longer announced as a gain.** The label was built as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``, and
 *    `formatPct` re-applies a sign — so `Math.abs` guaranteed a `+` and a 3.2%
 *    drop read "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it was `•`. Word, glyph and tone now come from one
 *    `changeParts()` call and cannot disagree.
 * 3. **The change is inked, not filled.** `changeToneClass()` hands back
 *    `text-success` / `text-danger` / `text-muted` — fill slots, with no
 *    contrast promise for text.
 * 4. **The ticker is not truncated to three characters.** `slice(0, 3)` turned
 *    every four-letter ticker into a different token on screen; the disc shows
 *    the symbol and ellipsises if it must.
 * 5. **A press is a state layer** on the shared row body, so a token row, a
 *    settings row and a notification are one family — and it is a real
 *    `<button>`, not a `div` wearing `role="button"` and a hand-written
 *    Enter/Space handler.
 */
export const TokenRowV4 = React.forwardRef<HTMLDivElement, TokenRowV4Props>(function TokenRowV4(
  {
    symbol,
    name,
    amount,
    decimals = 4,
    valueCents,
    currency = 'USD',
    changePct,
    icon,
    iconColor = 'primary',
    onClick,
    directionLabels,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

  const disc = DISC[iconColor];
  const hasChange = changePct != null;
  const change = changeParts(changePct, directionLabels);
  const quantity = formatToken(amount, { decimals, symbol });

  const label = spokenLine([
    symbol,
    name,
    quantity,
    valueCents != null ? formatMoney(valueCents, currency) : undefined,
    hasChange ? `${change.word} ${formatPct(changePct ?? 0)}` : undefined,
  ]);

  const rowClass = cn(
    ROW_V4_BASE_CLASS,
    rowHeightClass(name != null),
    'rounded-[var(--xen-radius-md)]'
  );

  const body = (
    <>
      <span className={ROW_V4_LEADING_CLASS}>
        <span
          className={cn(
            'flex h-full w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-full)]',
            disc.ground
          )}
        >
          {icon != null ? (
            <span aria-hidden="true" className={cn('text-lg', disc.ink)}>
              {icon}
            </span>
          ) : (
            <span className={cn('truncate px-xs text-xs font-bold', disc.ink)}>
              {symbol.toUpperCase()}
            </span>
          )}
        </span>
      </span>

      <span className={ROW_V4_TEXT_CLASS}>
        <span className="truncate text-base font-semibold text-on-card">{symbol}</span>
        {name != null ? <span className="truncate text-sm text-muted-text">{name}</span> : null}
      </span>

      <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
        <span className={cn('text-base font-semibold text-on-card', TABULAR_CLASS)}>
          {quantity}
        </span>
        <span className="flex items-center gap-xs">
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="muted" size="sm" />
          ) : null}
          {hasChange ? (
            <span
              // An interactive row already carries the direction in its own
              // name; saying it twice is worse than saying it once. A static
              // row has no name, so the word rides along invisibly instead.
              aria-hidden={onClick ? true : undefined}
              className={cn('text-xs font-semibold', TABULAR_CLASS, changeInkClass(change.tone))}
            >
              <span aria-hidden="true">{change.glyph}</span>{' '}
              {onClick ? null : <span className="sr-only">{`${change.word} `}</span>}
              {formatPct(changePct ?? 0)}
            </span>
          ) : null}
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
});
