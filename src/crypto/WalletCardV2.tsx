import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import { formatToken, truncateHash } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { WalletCardProps, WalletKind } from './WalletCard';

/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV2Props = WalletCardProps;

/** Custody → filled face slot (fill / on-fill text / sheen / chip tint). */
const KIND_META: Record<WalletKind, { fill: string; on: string; sheen: string; chip: string; glyph: string; label: string }> = {
  hot: { fill: 'bg-primary', on: 'text-on-primary', sheen: 'bg-on-primary', chip: 'bg-on-primary/20', glyph: '🔥', label: 'Hot' },
  hardware: { fill: 'bg-success', on: 'text-on-success', sheen: 'bg-on-success', chip: 'bg-on-success/20', glyph: '🔒', label: 'Hardware' },
  watch: { fill: 'bg-accent', on: 'text-on-accent', sheen: 'bg-on-accent', chip: 'bg-on-accent/20', glyph: '👁', label: 'Watch-only' },
};

/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen disc reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot (via `formatMoney`, integer cents — no drift),
 * with the custody badge up top and a translucent copyable address chip along the
 * bottom that hands the FULL address back through `onCopy`. Distinct at a glance
 * from the base's small bordered card. Same props.
 */
export const WalletCardV2 = React.forwardRef<HTMLDivElement, WalletCardV2Props>(function WalletCardV2(
  {
    address,
    label = 'Wallet',
    balanceCents,
    currency = 'USD',
    nativeAmount,
    nativeSymbol,
    nativeDecimals = 4,
    kind,
    variant: _variant,
    loading = false,
    onCopy,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = KIND_META[kind ?? 'hot'];
  const short = truncateHash(address, 6, 4);
  const interactive = pressableProps(onClick);
  const safeBalance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;

  return (
    <div
      ref={ref}
      aria-label={interactive ? label : undefined}
      className={cn(
        'relative flex min-h-[176px] flex-col justify-between gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] shadow-lg',
        meta.fill,
        meta.on,
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      {/* Sheen disc — a translucent on-color wash reading as a gradient. */}
      <span
        aria-hidden
        className={cn('pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-[var(--xen-radius-full)] opacity-10', meta.sheen)}
      />

      <div className="relative flex items-center gap-[var(--xen-space-sm)]">
        <span className="min-w-0 flex-1 truncate text-base font-bold">{label}</span>
        {kind ? (
          <span className={cn('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-[var(--xen-space-sm)] py-1 text-xs font-semibold', meta.chip)}>
            <span aria-hidden>{meta.glyph}</span> {meta.label}
          </span>
        ) : null}
      </div>

      {loading ? (
        <div aria-label="Loading balance" className={cn('relative h-8 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)]', meta.chip)} />
      ) : (
        <div className="relative flex flex-col gap-0.5">
          <span className="text-xs opacity-80">Balance</span>
          {safeBalance != null ? (
            <span className="text-3xl font-bold tabular-nums">{formatMoney(safeBalance, currency)}</span>
          ) : null}
          {nativeAmount != null ? (
            <span className="text-sm tabular-nums opacity-80">
              {formatToken(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })}
            </span>
          ) : null}
        </div>
      )}

      <button
        type="button"
        aria-label={`Copy address ${address}`}
        onClick={onCopy ? () => onCopy(address) : undefined}
        disabled={!onCopy}
        className={cn(
          'relative inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-[var(--xen-radius-full)] px-[var(--xen-space-sm)] py-1',
          meta.chip,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none'
        )}
      >
        <span className="text-sm tabular-nums">{short}</span>
        {onCopy ? (
          <span aria-hidden className="text-xs opacity-80">
            ⧉
          </span>
        ) : null}
      </button>
    </div>
  );
});
