import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { PriceTag, type MoneyFormatter } from '../commerce';

export interface PricePackageRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** À-la-carte line label (e.g. "Extra edited photo"). */
  label: string;
  /** Supporting detail line. */
  description?: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Unit suffix (e.g. "each", "/ hour"). */
  unitSuffix?: string;
  /** Highlights the row (accent tint + optional badge). */
  highlighted?: boolean;
  /** Small badge text (e.g. "Best value"). */
  badgeLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Passing `onClick` exposes it as a keyboard-operable `button` for quote
 * building. Composes `Badge` and `PriceTag`. Token-only colors.
 */
export const PricePackageRow = React.forwardRef<HTMLDivElement, PricePackageRowProps>(
  function PricePackageRow(
    {
      label,
      description,
      priceCents,
      currency = 'USD',
      unitSuffix,
      highlighted = false,
      badgeLabel,
      formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const interactive = typeof onClick === 'function';

    return (
      <div
        ref={ref}
        data-xen-price-package-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? label : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center justify-between gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          highlighted ? 'border-accent bg-accent-50' : 'border-border bg-surface',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            <span className="text-base font-semibold text-on-surface">{label}</span>
            {highlighted && badgeLabel ? <Badge tone="primary">{badgeLabel}</Badge> : null}
          </div>
          {description ? <p className="text-xs text-muted">{description}</p> : null}
        </div>
        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
          {unitSuffix ? <span className="text-xs text-muted">{unitSuffix}</span> : null}
        </div>
      </div>
    );
  }
);
