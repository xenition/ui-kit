import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken, truncateHash } from './internal/format';
import { pressableProps } from './internal/pressable';

/** Custody kind of the wallet. */
export type WalletKind = 'hot' | 'hardware' | 'watch';

export type WalletCardVariant = 'elevated' | 'outlined' | 'accent';

export interface WalletCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onCopy'> {
  /** Public address (truncated for display; full string used for copy/a11y). */
  address: string;
  /** Friendly label (e.g. `Main Wallet`). */
  label?: string;
  /** Total portfolio value in integer **cents**. */
  balanceCents?: number;
  /** ISO 4217 currency for the fiat balance (default `USD`). */
  currency?: string;
  /** Native-token balance amount (e.g. `1.245`). */
  nativeAmount?: number;
  /** Native-token ticker (e.g. `ETH`). */
  nativeSymbol?: string;
  /** Fraction digits for the native amount (default `4`). */
  nativeDecimals?: number;
  /** Custody kind — shown as a tone-mapped badge. */
  kind?: WalletKind;
  variant?: WalletCardVariant;
  /** Skeleton state while the balance loads. */
  loading?: boolean;
  /** Fires with the full address when the address chip is pressed. */
  onCopy?: (address: string) => void;
  /** Fires when the card body is pressed (keyboard-operable). */
  onClick?: () => void;
}

const KIND_META: Record<WalletKind, { label: string; tone: BadgeTone; glyph: string }> = {
  hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
  hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
  watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};

/**
 * The header card for a single wallet: a friendly label + custody badge, the
 * total fiat balance (via {@link MoneyAmount}, so the printed value never
 * drifts), the native-token amount, and a pressable truncated-address chip that
 * hands the FULL address back through `onCopy`. Token-bound throughout; the
 * `accent` variant tints the surface from the primary ramp. Web parity of the
 * native `WalletCard`.
 */
export const WalletCard = React.forwardRef<HTMLDivElement, WalletCardProps>(function WalletCard(
  {
    address,
    label = 'Wallet',
    balanceCents,
    currency = 'USD',
    nativeAmount,
    nativeSymbol,
    nativeDecimals = 4,
    kind,
    variant = 'elevated',
    loading = false,
    onCopy,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const short = truncateHash(address, 6, 4);
  const kindMeta = kind ? KIND_META[kind] : undefined;
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      aria-label={interactive ? label : undefined}
      className={cn(
        variant === 'accent' && 'bg-primary-50',
        variant === 'outlined' && 'shadow-none',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex flex-col gap-[var(--xen-space-md)]">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{label}</span>
          {kindMeta ? (
            <Badge tone={kindMeta.tone}>
              <span aria-hidden="true">{kindMeta.glyph}</span> {kindMeta.label}
            </Badge>
          ) : null}
        </div>

        {loading ? (
          <div aria-label="Loading balance" className="h-8 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        ) : (
          <div className="flex flex-col gap-0.5">
            {balanceCents != null ? (
              <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="xl" />
            ) : null}
            {nativeAmount != null ? (
              <span className="text-sm tabular-nums text-muted">
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
            'inline-flex items-center gap-1 self-start rounded-full border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-1',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none'
          )}
        >
          <span className="text-sm tabular-nums text-on-surface">{short}</span>
          {onCopy ? (
            <span aria-hidden="true" className="text-xs text-muted">
              ⧉
            </span>
          ) : null}
        </button>
      </div>
    </Card>
  );
});
