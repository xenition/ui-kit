import * as React from 'react';
import { cn } from '../primitives/cn';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken, truncateHash } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { WalletCardProps, WalletKind } from './WalletCard';

/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV3Props = WalletCardProps;

/** Custody → tinted lead dot + label. */
const KIND_META: Record<WalletKind, { dot: string; label: string }> = {
  hot: { dot: 'bg-primary', label: 'Hot' },
  hardware: { dot: 'bg-success', label: 'Hardware' },
  watch: { dot: 'bg-accent', label: 'Watch-only' },
};

/**
 * WalletCard, redesigned (v3): a **minimal list row** built around a copyable
 * address chip. A single custody-tinted dot leads a label + address stack, where
 * the truncated address sits in a bordered chip that hands the FULL address back
 * through `onCopy`; the fiat balance is right-aligned through {@link MoneyAmount}
 * (integer cents — no drift) over the native amount. No card, just a hairline
 * base rule, so a stack reads as a lean wallet list. Distinct at a glance from
 * the base's card and v2's gradient face. Same props.
 */
export const WalletCardV3 = React.forwardRef<HTMLDivElement, WalletCardV3Props>(function WalletCardV3(
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
  const meta = kind ? KIND_META[kind] : undefined;
  const short = truncateHash(address, 6, 4);
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? label : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        aria-hidden
        className={cn('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', meta ? meta.dot : 'bg-muted')}
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[var(--xen-space-xs)]">
        <span className="truncate text-base font-semibold text-on-surface">{label}</span>
        <button
          type="button"
          aria-label={`Copy address ${address}`}
          onClick={onCopy ? () => onCopy(address) : undefined}
          disabled={!onCopy}
          className={cn(
            'inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-0.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none'
          )}
        >
          <span className="text-xs tabular-nums text-on-surface">{short}</span>
          {onCopy ? (
            <span aria-hidden className="text-xs text-muted">
              ⧉
            </span>
          ) : null}
        </button>
      </div>

      {loading ? (
        <div aria-label="Loading balance" className="h-5 w-20 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
      ) : (
        <div className="flex flex-col items-end gap-0.5">
          {balanceCents != null ? (
            <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="md" />
          ) : null}
          {nativeAmount != null ? (
            <span className="text-xs tabular-nums text-muted">
              {formatToken(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
});
