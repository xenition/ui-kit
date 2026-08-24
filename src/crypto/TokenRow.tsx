import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneClass, changeToneKey, formatPct, formatToken } from './internal/format';
import { pressableProps } from './internal/pressable';

/** Static `text-*` token class per icon color slot (literal classes for JIT). */
const ICON_TEXT: Record<IconColor, string> = {
  onSurface: 'text-on-surface',
  onPrimary: 'text-on-primary',
  primary: 'text-primary',
  muted: 'text-muted',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

export interface TokenRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Token ticker (e.g. `ETH`). */
  symbol: string;
  /** Token long name (e.g. `Ethereum`). */
  name?: string;
  /** Held quantity in token units. */
  amount: number;
  /** Fraction digits for the held quantity (default `4`). */
  decimals?: number;
  /** Fiat value of the holding, in integer **cents** (funnelled through MoneyAmount). */
  valueCents?: number;
  /** ISO 4217 currency for the fiat value (default `USD`). */
  currency?: string;
  /** 24h price change as a percentage (gain = `success`, loss = `danger`). */
  changePct?: number;
  /** Leading glyph/emoji for the token disc. */
  icon?: string;
  /** Accent slot for the token disc (default `primary`). */
  iconColor?: IconColor;
  /** Fires on row click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

/**
 * One holding in a token list: a tinted token disc, symbol/name, the held
 * quantity (fixed-precision — no float drift), and a right-aligned fiat value
 * over a token-toned 24h change (gain = `success`, loss = `danger`, each with a
 * ▲/▼ glyph so it is not color-only). Becomes a keyboard-operable button when
 * `onClick` is set. Web parity of the native `TokenRow`.
 */
export const TokenRow = React.forwardRef<HTMLDivElement, TokenRowProps>(function TokenRow(
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
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-neutral-100">
        {icon != null ? (
          <Icon glyph={icon} color={iconColor} size="lg" />
        ) : (
          <span className={cn('text-sm font-bold', ICON_TEXT[iconColor])}>
            {symbol.slice(0, 3).toUpperCase()}
          </span>
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{symbol}</span>
        {name != null ? <span className="truncate text-sm text-muted">{name}</span> : null}
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-base font-semibold tabular-nums text-on-surface">
          {formatToken(amount, { decimals, symbol })}
        </span>
        <div className="flex items-center gap-1">
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="neutral" size="sm" />
          ) : null}
          {hasChange ? (
            <span
              aria-label={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
              className={cn('text-xs font-semibold tabular-nums', changeToneClass(toneKey))}
            >
              {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
});
