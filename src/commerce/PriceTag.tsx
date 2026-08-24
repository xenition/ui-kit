import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, MoneyFormatter } from './money';

export interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Current price in integer cents. */
  cents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional "was" price in cents; shown struck-through when higher than `cents`. */
  compareAtCents?: number;
  /** Override the cents → string formatter (locale control, custom symbols). */
  formatMoney?: MoneyFormatter;
  /** Visual scale of the current price (default `md`). */
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<NonNullable<PriceTagProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

/**
 * Formatted price with an optional strikethrough "compare-at" original. All
 * money is integer cents formatted through {@link formatMoney} (overridable
 * via the `formatMoney` prop). Token-only: the sale price reads `on-surface`,
 * the struck original is `muted`.
 */
export const PriceTag = React.forwardRef<HTMLSpanElement, PriceTagProps>(function PriceTag(
  {
    cents,
    currency = 'USD',
    compareAtCents,
    formatMoney: format = formatMoney,
    size = 'md',
    className,
    ...rest
  },
  ref
) {
  const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;
  return (
    <span
      ref={ref}
      data-xen-price-tag=""
      className={cn('inline-flex items-baseline gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      <span
        data-xen-price=""
        className={cn('font-heading font-semibold text-on-surface', SIZE_CLASSES[size])}
      >
        {format(cents, currency)}
      </span>
      {hasCompare ? (
        <span data-xen-compare-at="" className="text-sm text-muted line-through">
          {format(compareAtCents as number, currency)}
        </span>
      ) : null}
    </span>
  );
});
