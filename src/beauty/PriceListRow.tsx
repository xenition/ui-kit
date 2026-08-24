import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag, formatMoney, type MoneyFormatter } from '../commerce';

export type PriceListRowVariant = 'default' | 'section';

export interface PriceListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left label — the service/item name, or a section title. */
  label: string;
  /** Price in integer cents. Omit for `section` rows. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Renders "from {price}" when the price is a starting rate. */
  fromPrice?: boolean;
  /** Small note under the label (e.g. duration or "incl. wash"). */
  note?: string;
  /** Duration in minutes, shown as a right-aligned sub-line. */
  durationMin?: number;
  /** Struck-through original price in cents (when discounted). */
  compareAtCents?: number;
  /** `section` renders a subdued header row (bold label, no price). */
  variant?: PriceListRowVariant;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * One line of a printed-style salon price list: a left label (+ optional note)
 * and a right-aligned price. `fromPrice` prefixes "from"; `compareAtCents`
 * strikes through the original (via the shared {@link PriceTag}); `durationMin`
 * adds a small sub-line. The `section` variant is a subdued header (bold label,
 * no price). Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
export const PriceListRow = React.forwardRef<HTMLDivElement, PriceListRowProps>(
  function PriceListRow(
    {
      label,
      priceCents,
      currency = 'USD',
      fromPrice = false,
      note,
      durationMin,
      compareAtCents,
      variant = 'default',
      formatMoney: format = formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    if (variant === 'section') {
      return (
        <div
          ref={ref}
          data-xen-price-list-row="section"
          role="heading"
          aria-level={3}
          aria-label={label}
          className={cn(
            'border-b border-border py-[var(--xen-space-sm)]',
            className
          )}
          {...rest}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-muted">
            {label}
          </span>
        </div>
      );
    }

    const hasPrice = typeof priceCents === 'number';
    const hasCompare =
      typeof compareAtCents === 'number' && hasPrice && compareAtCents > (priceCents as number);
    const priceText = hasPrice ? `${fromPrice ? 'from ' : ''}${format(priceCents as number, currency)}` : '—';

    return (
      <div
        ref={ref}
        data-xen-price-list-row=""
        aria-label={`${label}${hasPrice ? `, ${priceText}` : ''}${
          durationMin != null ? `, ${durationMin} minutes` : ''
        }`}
        className={cn(
          'flex items-start gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)] text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold text-on-surface">{label}</span>
          {note ? <span className="text-xs text-muted">{note}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {hasPrice ? (
            <span className="flex items-baseline gap-[var(--xen-space-xs)]">
              {fromPrice ? <span className="text-xs text-muted">from</span> : null}
              <PriceTag
                cents={priceCents as number}
                currency={currency}
                compareAtCents={hasCompare ? compareAtCents : undefined}
                formatMoney={format}
                size="sm"
              />
            </span>
          ) : (
            <span className="text-base font-bold text-on-surface">—</span>
          )}
          {durationMin != null ? (
            <span className="text-xs text-muted">{durationMin} min</span>
          ) : null}
        </div>
      </div>
    );
  }
);
