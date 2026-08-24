import * as React from 'react';
import { cn } from '../primitives/cn';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken } from './internal/format';

/** Relative confirmation speed of a fee tier. */
export type GasSpeed = 'slow' | 'average' | 'fast';

export interface GasFeeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Fee tier — drives the label and glyph. */
  speed: GasSpeed;
  /** Gas price in gwei. */
  gwei: number;
  /** Estimated total cost in integer **cents** (fiat). */
  costCents?: number;
  /** ISO 4217 currency for the cost (default `USD`). */
  currency?: string;
  /** Human ETA (e.g. `~30s`, `~2m`). */
  eta?: string;
  /** Whether this tier is the selected one. */
  selected?: boolean;
  /** Fires with the `speed` when the row is chosen (selectable list). */
  onSelect?: (speed: GasSpeed) => void;
}

const SPEED_META: Record<GasSpeed, { label: string; glyph: string }> = {
  slow: { label: 'Slow', glyph: '🐢' },
  average: { label: 'Average', glyph: '🚶' },
  fast: { label: 'Fast', glyph: '⚡' },
};

/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and `aria-checked`; when `onSelect` is set it
 * becomes a keyboard-operable `radio`. Web parity of the native `GasFeeRow`.
 */
export const GasFeeRow = React.forwardRef<HTMLDivElement, GasFeeRowProps>(function GasFeeRow(
  { speed, gwei, costCents, currency = 'USD', eta, selected = false, onSelect, className, ...rest },
  ref
) {
  const meta = SPEED_META[speed];
  const interactive = onSelect != null;

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(speed);
    }
  };

  return (
    <div
      ref={ref}
      role={interactive ? 'radio' : undefined}
      aria-checked={interactive ? selected : undefined}
      aria-label={interactive ? `${meta.label} gas` : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onSelect?.(speed) : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        selected ? 'border-primary bg-primary-50' : 'border-border bg-surface',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true" className="text-lg">
        {meta.glyph}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold text-on-surface">{meta.label}</span>
        <span className="text-xs tabular-nums text-muted">
          {formatToken(gwei, { decimals: 2, symbol: 'gwei' })}
          {eta != null ? ` · ${eta}` : ''}
        </span>
      </div>
      {costCents != null ? (
        <MoneyAmount cents={costCents} currency={currency} tone="neutral" size="sm" />
      ) : null}
    </div>
  );
});
