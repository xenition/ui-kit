import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { Sparkline } from '../charts/Sparkline';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneClass, changeToneKey, formatPct, formatToken, type ChangeTone } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { TokenRowProps } from './TokenRow';

/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV2Props = TokenRowProps;

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

/** Tinted disc fill per icon color slot (the web equal of native `withAlpha`). */
const ICON_TINT: Record<IconColor, string> = {
  onSurface: 'bg-neutral-100',
  onPrimary: 'bg-primary/10',
  primary: 'bg-primary/10',
  muted: 'bg-neutral-100',
  success: 'bg-success/10',
  onSuccess: 'bg-success/10',
  warn: 'bg-warn/10',
  onWarn: 'bg-warn/10',
  danger: 'bg-danger/10',
  onDanger: 'bg-danger/10',
};

/** Change-tone → soft pill fill (token tint, never a literal color). */
const PILL_BG: Record<ChangeTone, string> = {
  success: 'bg-success/10',
  danger: 'bg-danger/10',
  muted: 'bg-neutral-100',
};

/**
 * TokenRow, redesigned (v2): an **elevated card** with a tinted token disc, a
 * derived {@link Sparkline}, and a toned change pill. The sparkline shape is
 * synthesized from `changePct` (it slopes up for gains, down for losses — no new
 * data needed), colored with the semantic tone slot; the 24h change reads in the
 * `text-success`/`text-danger` slots with a ▲/▼ glyph so it is never color-only.
 * Fiat runs through {@link MoneyAmount} (integer cents — no drift). Distinct at a
 * glance from the base's flat list line. Same props.
 */
export const TokenRowV2 = React.forwardRef<HTMLDivElement, TokenRowV2Props>(function TokenRowV2(
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

  // Synthesize a small trend shape from the 24h change — a presentational cue
  // derived from the only signal we have, so no extra prop is introduced.
  const spark = React.useMemo(() => {
    const c = Number.isFinite(changePct ?? 0) ? changePct ?? 0 : 0;
    const slope = Math.max(-1, Math.min(1, c / 12));
    return Array.from({ length: 14 }, (_, i) => {
      const t = i / 13 - 0.5;
      const base = 0.55 + slope * t;
      const wobble = Math.sin(i * 1.35) * 0.055;
      return Math.max(0.06, base + wobble);
    });
  }, [changePct]);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `${symbol} holding` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md',
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border',
          ICON_TINT[iconColor]
        )}
      >
        {icon != null ? (
          <Icon glyph={icon} color={iconColor} size="lg" />
        ) : (
          <span className={cn('text-sm font-bold', ICON_TEXT[iconColor])}>{symbol.slice(0, 3).toUpperCase()}</span>
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{symbol}</span>
        {name != null ? <span className="truncate text-xs text-muted">{name}</span> : null}
      </div>

      <Sparkline data={spark} color={toneKey} height={28} width={56} className="shrink-0" aria-label={`${symbol} trend`} />

      <div className="flex min-w-[76px] flex-col items-end gap-1">
        {valueCents != null ? (
          <MoneyAmount cents={valueCents} currency={currency} tone="neutral" size="sm" />
        ) : (
          <span className="text-sm font-semibold tabular-nums text-on-surface">
            {formatToken(amount, { decimals, symbol })}
          </span>
        )}
        {hasChange ? (
          <span
            aria-label={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
            className={cn(
              'rounded-[var(--xen-radius-full)] px-[var(--xen-space-xs)] py-0.5 text-xs font-bold tabular-nums',
              PILL_BG[toneKey],
              changeToneClass(toneKey)
            )}
          >
            {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
          </span>
        ) : null}
      </div>
    </div>
  );
});
