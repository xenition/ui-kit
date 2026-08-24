import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

/** Price movement direction — colors the change and is stated with a glyph/sign. */
export type PriceDirection = 'up' | 'down' | 'flat';

export interface MarketPriceRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Commodity name (e.g. "Wheat"). */
  commodity: string;
  /** Current price (pre-formatted or numeric, e.g. `284.50`). */
  price: number | string;
  /** Currency / unit suffix (e.g. "€/t", "$/bu"). */
  unit?: string;
  /** Percentage change over the period (e.g. `1.8` or `-0.6`). Guarded. */
  changePct?: number;
  /** Explicit direction; otherwise derived from the sign of `changePct`. */
  direction?: PriceDirection;
  /** Leading glyph/emoji. Default `'🌾'`. */
  icon?: string;
  /** Market / period hint (e.g. "Chicago · today"). */
  market?: string;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

const DIR_META: Record<PriceDirection, { glyph: string; text: string; sign: string }> = {
  up: { glyph: '▲', text: 'text-success', sign: '+' },
  down: { glyph: '▼', text: 'text-danger', sign: '' },
  flat: { glyph: '▪', text: 'text-muted', sign: '' },
};

function deriveDirection(changePct?: number): PriceDirection {
  if (typeof changePct !== 'number' || changePct === 0) return 'flat';
  return changePct > 0 ? 'up' : 'down';
}

/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * When `onClick` is set the row is an accessible `role="button"` with keyboard
 * activation. Token-bound throughout — no literal colors.
 */
export const MarketPriceRow = React.forwardRef<HTMLDivElement, MarketPriceRowProps>(
  function MarketPriceRow(
    {
      commodity,
      price,
      unit,
      changePct,
      direction,
      icon = '🌾',
      market,
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const dir = direction ?? deriveDirection(changePct);
    const meta = DIR_META[dir];
    const hasChange = typeof changePct === 'number';
    const changeText = hasChange
      ? `${meta.glyph} ${meta.sign}${Math.abs(changePct).toFixed(1)}%`
      : null;
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-market-price-row=""
        className={cn(
          'flex items-center gap-2 py-2',
          !last && 'border-b border-border',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={
          interactive
            ? `${commodity}, ${String(price)}${unit ? ` ${unit}` : ''}${
                changeText ? `, ${dir} ${Math.abs(changePct as number).toFixed(1)} percent` : ''
              }`
            : undefined
        }
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <Icon glyph={icon} size="lg" color="onSurface" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{commodity}</p>
          {market != null ? <p className="truncate text-xs text-muted">{market}</p> : null}
        </div>
        <div className="flex flex-col items-end">
          <span className="font-heading text-base font-bold text-on-surface">
            {String(price)}
            {unit != null ? (
              <span className="text-xs font-normal text-muted"> {unit}</span>
            ) : null}
          </span>
          {changeText != null ? (
            <span className={cn('text-xs font-semibold', meta.text)}>{changeText}</span>
          ) : null}
        </div>
      </div>
    );
  }
);
