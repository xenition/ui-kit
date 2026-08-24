import * as React from 'react';
import { cn } from '../primitives/cn';
import { changeGlyph, changeToneClass, changeToneKey, formatPct, formatToken } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { TokenRowProps } from './TokenRow';

/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV3Props = TokenRowProps;

/**
 * TokenRow, redesigned (v3): a **dense one-line quote**. A bold ticker leads, the
 * held quantity fills the middle (fixed precision — no float drift), and the 24h
 * change is pinned right in the `text-success`/`text-danger` slot with a ▲/▼ glyph
 * so it is never color-only. No disc, no card, no sparkline — a compact ticker
 * line that packs many rows on screen. Distinct at a glance from the base's
 * 40px-disc list and v2's card. Same props.
 */
export const TokenRowV3 = React.forwardRef<HTMLDivElement, TokenRowV3Props>(function TokenRowV3(
  {
    symbol,
    name: _name,
    amount,
    decimals = 4,
    valueCents: _valueCents,
    currency: _currency,
    changePct,
    icon: _icon,
    iconColor: _iconColor,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const hasChange = changePct != null;
  const toneKey = changeToneKey(changePct ?? 0);
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `${symbol} holding` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span className="w-[68px] shrink-0 truncate text-sm font-bold text-on-surface">{symbol}</span>

      <span className="min-w-0 flex-1 truncate text-sm tabular-nums text-muted">
        {formatToken(amount, { decimals, symbol })}
      </span>

      {hasChange ? (
        <span
          aria-label={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
          className={cn('min-w-[78px] shrink-0 text-right text-sm font-bold tabular-nums', changeToneClass(toneKey))}
        >
          {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
        </span>
      ) : null}
    </div>
  );
});
