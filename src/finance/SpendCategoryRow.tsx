import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { Meter, type FinanceColor } from './internal/Meter';
import { MoneyAmount } from './MoneyAmount';
import { pressableProps } from './internal/pressable';

export interface SpendCategoryRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Category name (e.g. "Groceries"). */
  category: string;
  /** Amount spent in this category, in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Share of total spend, `0`–`1`; drives the inline bar width and the `%` chip. */
  share?: number;
  /** Leading glyph/emoji (e.g. `'🛒'`). */
  icon?: string;
  /** Token color slot for the glyph + bar (default `primary`). */
  color?: FinanceColor;
  /** Fires on row click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link Meter} and prints as a whole-percent chip; the
 * amount is neutral-toned integer cents. Fully token-bound. Web parity of the
 * native `SpendCategoryRow`.
 */
export const SpendCategoryRow = React.forwardRef<HTMLDivElement, SpendCategoryRowProps>(
  function SpendCategoryRow(
    { category, amountCents, currency = 'USD', share, icon, color = 'primary', onClick, className, ...rest },
    ref
  ) {
    const clampedShare =
      typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;
    // `Icon` has no `accent` slot; fall back to `primary` for the glyph while
    // the bar keeps the requested color.
    const iconColor: IconColor = color === 'accent' ? 'primary' : color;
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? category : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        {icon != null ? <Icon glyph={icon} color={iconColor} size="xl" /> : null}
        <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
          <div className="flex items-baseline justify-between">
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">
              {category}
            </span>
            {clampedShare != null ? (
              <span className="text-xs text-muted">{Math.round(clampedShare * 100)}%</span>
            ) : null}
          </div>
          {clampedShare != null ? (
            <Meter
              value={clampedShare * 100}
              color={color}
              aria-label={`${category}, ${Math.round(clampedShare * 100)}% of spend`}
            />
          ) : null}
        </div>
        <MoneyAmount cents={amountCents} currency={currency} tone="neutral" size="sm" />
      </div>
    );
  }
);
